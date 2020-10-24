import React, { useEffect, useRef } from "react";
import CartStyles from "./styles/CartStyles";
import { ButtonContinue, ButtonMainNormal } from "./styles/ButtonStyles";
import { useQuery } from "@apollo/react-hooks";
import Error from "./errorMessage";
import { CURRENT_USER_QUERY, IS_CART_OPEN_QUERY } from "../lib/queries";
import CartItem from "./cartItem";
import formatMoney from "./utils/formatMoney";
import CreditCardCheckout from "./creditCardCheckout";
import { ICartItem } from "./cartItem";
import { isCartOpen } from "../lib/vars";
import { emptyCart } from "../lib/images";
import { useState } from "react";

export default function Cart() {
  const cartOpenData = useQuery(IS_CART_OPEN_QUERY);
  const currentUserQuery = useQuery(CURRENT_USER_QUERY);

  const [cartAnimationActive, setCartAnimationActive] = useState(false);

  useEffect(() => {
    if (!currentUserQuery.loading) {
      const timer = setTimeout(() => {
        setCartAnimationActive(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentUserQuery]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = currentUserQuery?.data?.user;

  const totalPrice = user?.cart
    ? user.cart.reduce((all: number, cartItem: ICartItem) => {
        if (cartItem.item) return all + cartItem.quantity * cartItem.item.price;
        else return;
      }, 0)
    : "";
  const cartOpen = cartOpenData.data.cartOpen;

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef && !wrapperRef?.current.contains(event.target)) {
      isCartOpen(false);
    }
  }

  if (cartOpenData.loading) return <p>Loading...</p>;
  if (cartOpenData.error) return <Error error={cartOpenData.error}></Error>;

  if (currentUserQuery.loading) return <p>Loading...</p>;
  if (currentUserQuery.error)
    return <Error error={currentUserQuery.error}></Error>;

  if (currentUserQuery) {
    return (
      <CartStyles
        open={cartOpen}
        ref={wrapperRef}
        cartAnimationActive={cartAnimationActive}
      >
        <div className="cartTop">
          <button
            className="closeButton"
            onClick={() => {
              isCartOpen(false);
            }}
            title="close"
          >
            &times;
          </button>
          <p>
            Shopping Cart
            {user.cart.length > 0 && (
              <> - item {user.cart.length === 1 ? "" : "s"}</>
            )}
          </p>
        </div>
        {user?.cart?.length === 0 && (
          <>
            <img src={emptyCart} />{" "}
            <ButtonContinue
              onClick={() => {
                isCartOpen(false);
              }}
            >
              CONTINUE SHOPPING
            </ButtonContinue>
          </>
        )}

        <ul>
          {user?.cart?.map((cartItem: ICartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem}></CartItem>
          ))}
        </ul>
        {user?.cart?.length > 0 && (
          <footer>
            <p>{formatMoney(totalPrice)}</p>

            <CreditCardCheckout
              cart={user.cart}
              totalPrice={totalPrice}
              allItemsCount={user.cart.length}
              user={user}
            >
              <ButtonMainNormal>Checkout</ButtonMainNormal>
            </CreditCardCheckout>
          </footer>
        )}
      </CartStyles>
    );
  } else {
    return <></>;
  }
}
