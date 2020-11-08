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
    id: string;
    price: number;
    user: null;
    image: string;
    title: string;
    description: string;
    largeImage: string;
    brand: string;
    category: string;
    gender: string;
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
  const [addToCart, addToCartMutation] = useMutation(ADD_TO_CART_MUTATION);

  const [deleteCartItem, deleteCartItemMutation] = useMutation(
    DELETE_CART_ITEM_MUTATION
  );

  const deleteCartUpdate = (cache: any, payload: any) => {
    let data;
    try {
      data = cache.readQuery({ query: CURRENT_USER_QUERY });
    } catch (e) {
      console.log(e.message);
    }

    const cartItemId = payload.data.deleteCartItem.id;

    const newCart = data.user.cart.filter(
      (cartItem: ICartItem) => cartItem.id !== cartItemId
    );

    try {
      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { user: { cart: newCart } },
      });
    } catch (e) {
      console.log(e.message);
    }
  };

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
          <span style={{ fontWeight: 900, display: "inline" }}>
            {formatMoney(cartItem?.item?.price)}
          </span>
        </p>
      </div>
      <div className="counter">
        <ButtonCounterFirstCart
          onClick={async () => {
            handleLoading(true);
            await addToCart({
              variables: {
                id: cartItem.item.id,
                quantity: +1,
                size: cartItem.size,
              },
            }).catch((err) => console.log(err.message));

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

                // optimisticResponse: {
                //   __typename: "Mutation",
                //   deleteCartItem: {
                //     __typename: "CartItem",
                //   },
                // },
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

            optimisticResponse: {
              __typename: "Mutation",
              deleteCartItem: {
                __typename: "cartItem",
                id: cartItem.item.id,
              },
            },
          }).catch((err) => console.log(err.message));
        }}
      >
        <Icon size="small" name="trash" color="black" />
      </ButtonStyle>
    </CartItemStyles>
  );
};
export default CartItem;
