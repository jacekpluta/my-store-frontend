import React, { useEffect } from "react";
import styled from "styled-components";
import formatMoney from "./formatMoney";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./queries";
import { makeVar } from "@apollo/client";

const ButtonStyle = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
`;

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

export const DELETE_CART_ITEM_WHEN_ITEM_DELETED_MUTATION = gql`
  mutation DELETE_CART_ITEM_WHEN_ITEM_DELETED_MUTATION($id: ID!) {
    deleteCartItemWhenItemDeleted(id: $id) {
      id
    }
  }
`;

export const DELETE_CART_ITEM_MUTATION = gql`
  mutation DELETE_CART_ITEM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

export const GET_DELETED_ITEM_ID = gql`
  {
    id @client
  }
`;

const CartItem = ({ cartItem }: any) => {
  const [
    deleteCartItemWhenItemDeleted,
    deleteCartItemWhenItemDeletedMutation,
  ] = useMutation(DELETE_CART_ITEM_WHEN_ITEM_DELETED_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  const [deleteCartItem, deleteCartItemMutation] = useMutation(
    DELETE_CART_ITEM_MUTATION
    // {
    //   refetchQueries: [{ query: CURRENT_USER_QUERY }],
    //   awaitRefetchQueries: true,
    // }
  );

  const currentUserQuery = useQuery(CURRENT_USER_QUERY);
  const getDeletedItemQuery = useQuery(GET_DELETED_ITEM_ID);
  const deletedItemId = getDeletedItemQuery?.data?.id;

  const deleteCartUpdate = (cache: any, payload: any) => {
    let data;
    try {
      data = cache.readQuery({ query: CURRENT_USER_QUERY });
    } catch (e) {
      console.log(e.message);
    }

    const cartItemId = payload.data.deleteCartItem.id;

    data.user.cart = data.user.cart.filter(
      (cartItem: any) => cartItem.id !== cartItemId
    );

    try {
      cache.writeQuery({ query: CURRENT_USER_QUERY, data });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (deletedItemId) {
      //delete item from cart if it was deleted from items page
      async function deleteItemFromCart() {
        const userCart = currentUserQuery.data.user.cart;

        //check if deleted item is in the cart
        const foundItem = userCart.filter((item: any) => {
          if (item.item.id === deletedItemId) return item;
        });

        //if it is then delete it
        if (foundItem) {
          const id = foundItem[0].id;

          await deleteCartItemWhenItemDeleted({
            variables: {
              id: id,
            },
          }).catch((err) => console.log(err.message));

          //reset local query
          makeVar([{ data: { id: null } }]);

          // getDeletedItemQuery.client.writeData({ data: { id: null } });
        }
      }
      deleteItemFromCart();
    }
  }, [deletedItemId]);

  return (
    <CartItemStyles data-test="cartItem">
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

      {deleteCartItemMutation.data ? (
        <p>Item deleted!</p>
      ) : (
        <p>Item not deleted!</p>
      )}

      <ButtonStyle
        title="Delete Item"
        onClick={async () => {
          await deleteCartItem({
            variables: {
              id: cartItem.item.id,
            },
            update: deleteCartUpdate,
          }).catch((err) => console.log(err.message));
        }}
      >
        &times;
      </ButtonStyle>
    </CartItemStyles>
  );
};
export default CartItem;
