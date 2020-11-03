import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from "../../lib/queries";
import {
  ButtonCounterFirstCart,
  ButtonCounterNumberCart,
  ButtonCounterSecondCart,
} from "../styles/ButtonStyles";
import { CartItemStyles } from "../styles/CartItemStyles";
import formatMoney from "../utils/formatMoney";
import Error from "./../errorMessage";
import { ICartItem } from "./cart";

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

interface propsCartItem {
  handleLoading: Function;
  cartItem: {
    id: number;
    quantity: number;
    size: number;
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

const CartItem = ({ cartItem, handleLoading }: propsCartItem) => {
  const [addToCart, addToCartMutation] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const [
    deleteCartItemWhenItemDeleted,
    deleteCartItemWhenItemDeletedMutation,
  ] = useMutation(DELETE_CART_ITEM_WHEN_ITEM_DELETED_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  const [deleteCartItem, deleteCartItemMutation] = useMutation(
    DELETE_CART_ITEM_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
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

  if (addToCartMutation.error) return <Error error={addToCartMutation.error} />;
  if (!cartItem) return <p>Error: no cart item</p>;

  return (
    <CartItemStyles data-test="cartItem">
      <div className="image">
        <img src={cartItem?.item?.image} alt={cartItem?.item?.title}></img>
      </div>
      <div className="title">
        <p>{cartItem?.item?.title}</p>
      </div>
      <div className="size">
        <p>Size: {cartItem?.size}</p>
      </div>
      <div className="price">
        <p>
          {cartItem?.quantity} &times;{" "}
          <div style={{ fontWeight: 900, display: "inline" }}>
            {formatMoney(cartItem?.item?.price)}
          </div>
        </p>
      </div>
      <div className="counter">
        <ButtonCounterFirstCart
          onClick={async () => {
            handleLoading(true);
            await addToCart({
              variables: {
                id: cartItem.item.id,
                quantity: 1,
                size: cartItem.size,
              },
            });
            handleLoading(false);
          }}
        >
          +
        </ButtonCounterFirstCart>
        <ButtonCounterNumberCart>{cartItem?.quantity}</ButtonCounterNumberCart>
        <ButtonCounterSecondCart
          onClick={async () => {
            handleLoading(true);
            if (cartItem.quantity === 1) {
              await deleteCartItem({
                variables: {
                  id: cartItem.item.id,
                },
                update: deleteCartUpdate,
              }).catch((err) => console.log(err.message));
            } else {
              await addToCart({
                variables: {
                  id: cartItem.item.id,
                  quantity: -1,
                  size: cartItem.size,
                },
              });
            }

            handleLoading(false);
          }}
        >
          -
        </ButtonCounterSecondCart>
      </div>

      <ButtonStyle
        className="close"
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
        <Icon size="small" name="trash" color="black" />
      </ButtonStyle>
    </CartItemStyles>
  );
};
export default CartItem;
