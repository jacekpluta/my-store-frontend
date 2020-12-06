import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import {
  ADD_TO_CART_MUTATION,
  CART_LOCAL_QUERY,
  CURRENT_USER_QUERY,
} from "../../lib/queries";
import { cartLocal } from "../../lib/vars";
import {
  ButtonCounterFirstCart,
  ButtonCounterNumberCart,
  ButtonCounterSecondCart,
} from "../styles/ButtonStyles";
import { CartItemStyles } from "../styles/CartItemStyles";
import formatMoney from "../../lib/utils/formatMoney";
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
  user: {
    id: string;
    name: string;
    email: string;
    permissions: string[];
  };
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

const CartItem = ({ cartItem, handleLoading, user }: propsCartItem) => {
  const [addToCart, addToCartMutation] = useMutation(ADD_TO_CART_MUTATION);
  const data = useQuery(CART_LOCAL_QUERY);
  const localCart = [...data?.data?.cartLocal];
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
      (cartItem: ICartItem) => cartItem.item.id !== cartItemId
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

  const handleAddOneToCart = async () => {
    handleLoading(true);
    if (!user) {
      const isInCart = localCart.find((item) => {
        if (item.item.id + item.size === cartItem.item.id + cartItem.size)
          return cartItem;
      });

      if (isInCart) {
        const filteredCart = localCart.filter(
          (localCartItem) =>
            localCartItem.item.id + localCartItem.size !==
            isInCart.item.id + isInCart.size
        );

        cartLocal([
          ...filteredCart,
          {
            __typename: "Item",
            quantity: isInCart.quantity + 1,
            size: isInCart.size,
            item: isInCart.item,
          },
        ]);
      }
    } else {
      await addToCart({
        variables: {
          id: cartItem.item.id,
          quantity: +1,
          size: cartItem.size,
        },
      }).catch((err) => console.log(err.message));
    }

    handleLoading(false);
  };

  const handleSubstractOneFromCart = async () => {
    handleLoading(true);

    if (cartItem.quantity === 1) {
      handleDeleteOneFromCart();
    } else {
      if (!user) {
        const isInCart = localCart.find((itm) => {
          if (itm.item.id + itm.size === cartItem.item.id + cartItem.size)
            return cartItem;
        });

        if (isInCart) {
          const filteredCart = localCart.filter(
            (localCartItem) =>
              localCartItem.item.id + localCartItem.size !==
              isInCart.item.id + isInCart.size
          );

          cartLocal([
            ...filteredCart,
            {
              __typename: "Item",
              quantity: isInCart.quantity - 1,
              size: isInCart.size,
              item: isInCart.item,
            },
          ]);
        }
      } else {
        await addToCart({
          variables: {
            id: cartItem.item.id,
            quantity: -1,
            size: cartItem.size,
          },
        });
      }
    }

    handleLoading(false);
  };

  const handleDeleteOneFromCart = async () => {
    handleLoading(true);

    if (!user) {
      const isInCart = localCart.find((itm) => {
        if (itm.item.id + itm.size === cartItem.item.id + cartItem.size) {
          return cartItem;
        }
      });

      if (isInCart) {
        let filteredCart = localCart.filter(
          (localCartItem) =>
            localCartItem.item.id + localCartItem.size !==
            isInCart.item.id + isInCart.size
        );

        handleLoading(false);
        filteredCart.length === 0;

        if (filteredCart.length === 0) {
          return cartLocal(filteredCart);
        }

        return cartLocal([...filteredCart]);
      }
    }

    await deleteCartItem({
      variables: {
        id: cartItem.item.id,
      },
      update: deleteCartUpdate,
    }).catch((err) => console.log(err.message));

    // if (!user) {
    //   const isInCart = localCart.find((cartItem) => {
    //     if (
    //       cartItem.item.id + cartItem.size ===
    //       cartItem.item.id + cartItem.size
    //     )
    //       return cartItem;
    //   });

    //   if (isInCart) {
    //     const filteredCart = localCart.filter(
    //       (localCartItem) =>
    //         localCartItem.item.id + localCartItem.size !==
    //         isInCart.item.id + isInCart.size
    //     );

    //     console.log(filteredCart);

    //     cartLocal([filteredCart]);
    //   }
    // } else {
    //   await deleteCartItem({
    //     variables: {
    //       id: cartItem.item.id,
    //     },
    //     update: deleteCartUpdate,
    //   }).catch((err) => console.log(err.message));
    // }
    handleLoading(false);
  };
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
        <ButtonCounterFirstCart onClick={() => handleAddOneToCart()}>
          +
        </ButtonCounterFirstCart>
        <ButtonCounterNumberCart>{cartItem?.quantity}</ButtonCounterNumberCart>
        <ButtonCounterSecondCart onClick={() => handleSubstractOneFromCart()}>
          -
        </ButtonCounterSecondCart>
      </div>

      <ButtonStyle
        className="close"
        title="Delete Item"
        onClick={() => handleDeleteOneFromCart()}
      >
        <Icon size="small" name="trash" color="black" />
      </ButtonStyle>
    </CartItemStyles>
  );
};
export default CartItem;
