import React from "react";
import CartStyles from "./styles/CartStyles";

import CloseButton from "./styles/CloseButton";
import { ButtonMain } from "./styles/ButtonStyles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "./errorMessage";
import { CURRENT_USER_QUERY } from "./queries";
import CartItem from "./cartItem";
import formatMoney from "./utils/formatMoney";
import CreditCardCheckout from "./creditCardCheckout";
import { ICartItem } from "./cartItem";

export const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

export default function Cart() {
  const queryData = useQuery(LOCAL_STATE_QUERY);
  const [toggleCart, toggleCartMutation] = useMutation(TOGGLE_CART_MUTATION);

  const currentUserQuery = useQuery(CURRENT_USER_QUERY);

  if (
    queryData.loading ||
    toggleCartMutation.loading ||
    currentUserQuery.loading
  )
    return <p>Loading...</p>;
  if (queryData.error || toggleCartMutation.error || currentUserQuery.error)
    return <Error error={toggleCartMutation.error || queryData.error}></Error>;

  const cartOpen = queryData?.data?.cartOpen;

  const user = currentUserQuery?.data?.user;
  if (!user) return <p></p>;

  const totalPrice = user?.cart
    ? user.cart.reduce((all: number, cartItem: ICartItem) => {
        if (cartItem.item) return all + cartItem.quantity * cartItem.item.price;
        else return;
      }, 0)
    : "";

  return (
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton onClick={() => toggleCart()} title="close">
          &times;
        </CloseButton>
        {user.name} - Cart
        <p>
          You have {user.cart.length} item {user.cart.length === 1 ? "" : "s"}{" "}
          in your cart
        </p>
      </header>
      <ul>
        {user.cart.map((cartItem: ICartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem}></CartItem>
        ))}
      </ul>
      <footer>
        <p>{formatMoney(totalPrice)}</p>
        {user.cart.length && (
          <CreditCardCheckout
            cart={user.cart}
            totalPrice={totalPrice}
            allItemsCount={user.cart.length}
            user={user}
          >
            <ButtonMain
              onClick={() => {
                toggleCart();
              }}
            >
              Checkout
            </ButtonMain>
          </CreditCardCheckout>
        )}
      </footer>
    </CartStyles>
  );
}
