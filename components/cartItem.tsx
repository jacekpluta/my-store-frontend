import React, { useEffect } from "react";
import styled from "styled-components";
import formatMoney from "./utils/formatMoney";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../lib/queries";
import { CartItemStyles } from "./styles/CartItemStyles";

const ButtonStyle = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
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

export interface IItem {
  item: {
    id: number;
    price: number;
    user: null;
    image: string;
    title: string;
    description: string;
    largeImage: string;
  };
}
export interface ICartItem {
  id: number;
  quantity: number;
  item: {
    id: number;
    price: number;
    user: null;
    image: string;
    title: string;
    description: string;
    largeImage: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    permissions: string[];
  };
}
interface propsCartItem {
  cartItem: {
    id: number;
    quantity: number;
    item: {
      id: number;
      price: number;
      user: null;
      image: string;
      title: string;
      description: string;
      largeImage: string;
    };
    user: {
      id: string;
      name: string;
      email: string;
      permissions: string[];
    };
  };
}

const CartItem = ({ cartItem }: propsCartItem) => {
  const [
    deleteCartItemWhenItemDeleted,
    deleteCartItemWhenItemDeletedMutation,
  ] = useMutation(DELETE_CART_ITEM_WHEN_ITEM_DELETED_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });
  if (!cartItem) return <p>Error: no cart item</p>;

  const [deleteCartItem, deleteCartItemMutation] = useMutation(
    DELETE_CART_ITEM_MUTATION
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
      (cartItem: ICartItem) => cartItem.id !== cartItemId
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
        const foundItem = userCart.filter((item: IItem) => {
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
        }
      }
      deleteItemFromCart();
    }
  }, [deletedItemId]);

  return (
    <CartItemStyles data-test="cartItem">
      <img
        width="200"
        src={cartItem?.item?.image}
        alt={cartItem?.item?.title}
      ></img>
      <div>
        <h3>{cartItem?.item?.title}</h3>
        <p>
          {formatMoney(cartItem?.item?.price * cartItem.quantity)} -{" "}
          {cartItem?.quantity} &times; {formatMoney(cartItem?.item?.price)} each
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
