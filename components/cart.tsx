import React from "react";
import CartStyles from "./styles/CartStyles";

import CloseButton from "./styles/CloseButton";
import { ButtonMainNormal } from "./styles/ButtonStyles";
import { useQuery } from "@apollo/react-hooks";

import Error from "./errorMessage";
import { CURRENT_USER_QUERY, IS_CART_OPEN_QUERY } from "../lib/queries";
import CartItem from "./cartItem";
import formatMoney from "./utils/formatMoney";
import CreditCardCheckout from "./creditCardCheckout";
import { ICartItem } from "./cartItem";

import { isCartOpen } from "../lib/vars";

export default function Cart() {
  const cartOpenData = useQuery(IS_CART_OPEN_QUERY);
  const currentUserQuery = useQuery(CURRENT_USER_QUERY);

  if (cartOpenData.loading) return <p>Loading...</p>;
  if (cartOpenData.error) return <p>ERROR: {cartOpenData.error.message}</p>;

  if (currentUserQuery.loading) return <p>Loading...</p>;
  if (currentUserQuery.error)
    return <Error error={currentUserQuery.error}></Error>;

  const user = currentUserQuery?.data?.user;
  if (!user) return <p></p>;

  const totalPrice = user?.cart
    ? user.cart.reduce((all: number, cartItem: ICartItem) => {
        if (cartItem.item) return all + cartItem.quantity * cartItem.item.price;
        else return;
      }, 0)
    : "";

  return (
    <CartStyles open={cartOpenData.data.cartOpen}>
      <header>
        <CloseButton
          onClick={() => {
            isCartOpen(false);
          }}
          title="close"
        >
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
            <ButtonMainNormal>Checkout</ButtonMainNormal>
          </CreditCardCheckout>
        )}
      </footer>
    </CartStyles>
  );
}
