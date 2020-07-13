import React from "react";
import styled from "styled-components";
import { formatMoney } from "./item";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./queries";

const ButtonStyle = styled.button`
font-size: 3rem;
background: none;
border: 0;
&:hover {
    color: ${(props) => props.theme.red}
    cursor: pointer
}`;

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.lightgray};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }

  p {
    margin: 0;
  }
`;

const DELETE_CART_ITEM_MUTATION = gql`
  mutation DELETE_CART_ITEM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

export default function CartItem({ cartItem }) {
  const [deleteCartItem, deleteCartItemMutation] = useMutation(
    DELETE_CART_ITEM_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      awaitRefetchQueries: true,
    }
  );

  const deleteCartUpdate = (cache, payload) => {
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });

    const cartItemId = payload.data.deleteCartItem.id;

    const newData = data.user.cart.filter((cartItem) => {
      return cartItem.id !== cartItemId;
    });

    cache.writeQuery({ query: CURRENT_USER_QUERY, data: newData });
  };

  return (
    <CartItemStyles>
      <img
        width="200"
        src={cartItem.item.image}
        alt={cartItem.item.title}
      ></img>
      <div>
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)} -{" "}
          {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
        </p>
      </div>
      {console.log(cartItem.item.id)}
      <ButtonStyle
        title="Delete Item"
        onClick={async () => {
          await deleteCartItem({
            variables: {
              id: cartItem.item.id,
            },
            update: deleteCartUpdate,
            optimisticResponse: {
              __typename: "Mutation",
              deleteCartItem: {
                __typename: "CartItem",
                id: cartItem.item.id,
              },
            },
          })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => alert(err.message));
        }}
      >
        &times;
      </ButtonStyle>
    </CartItemStyles>
  );
}
