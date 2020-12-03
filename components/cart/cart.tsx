import { useQuery } from "@apollo/react-hooks";
import React, { useEffect, useRef, useState } from "react";
import { emptyCart } from "../../lib/images";
import {
  CART_LOCAL_QUERY,
  CURRENT_USER_QUERY,
  IS_CART_OPEN_QUERY,
} from "../../lib/queries";
import { isCartOpen } from "../../lib/vars";
import {
  ButtonCartView,
  ButtonCartCheck,
  ButtonContinue,
} from "../styles/ButtonStyles";
import CartStyles from "../styles/CartStyles";
import formatMoney from "../utils/formatMoney";
import CartItem from "./cartItem";
import CreditCardCheckout from "./creditCardCheckout";

export interface ICartItem {
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
}

export default function Cart() {
  const cartOpenData = useQuery(IS_CART_OPEN_QUERY);
  const currentUserQuery = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "cache-and-network",
  });
  const cartLocal = useQuery(CART_LOCAL_QUERY);

  const [isLoading, setIsLoading] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = currentUserQuery?.data?.user;

  const cartOpen = cartOpenData.data.cartOpen;

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef && !wrapperRef?.current?.contains(event.target)) {
      isCartOpen(false);
    }
  }

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const cartUserLength = user?.cart?.length;
  const cartLocalLength = cartLocal?.data?.cartLocal?.length;

  const cartUserItems = user?.cart;
  const cartLocalItems = cartLocal?.data?.cartLocal;

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cartUserLength === 0 || cartLocalLength === 0) {
      return setCartItems([]);
    }

    if (cartUserLength > 0) {
      return setCartItems(cartUserItems);
    }

    if (!cartUserLength && cartLocalLength > 0) {
      return setCartItems(cartLocalItems);
    }
  }, [cartUserItems, cartLocalItems]);

  const totalPrice = cartItems
    ? cartItems.reduce((all: number, cartItem: ICartItem) => {
        if (cartItem.item) return all + cartItem.quantity * cartItem.item.price;
        else return;
      }, 0)
    : "";

  return (
    <CartStyles open={cartOpen} ref={wrapperRef} animate={true}>
      {isLoading && <div className="loading" aria-busy={isLoading}></div>}

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
          {cartItems.length > 0 && (
            <>
              {" "}
              - {cartItems.length} item{cartItems.length === 1 ? "" : "s"}
            </>
          )}
        </p>
      </div>

      <div className="cartItems">
        {cartItems.length === 0 ? (
          <>
            <div className="emptyCart">
              <img height={200} src={emptyCart} />
            </div>
            <ButtonContinue
              onClick={() => {
                isCartOpen(false);
              }}
            >
              CONTINUE SHOPPING
            </ButtonContinue>
          </>
        ) : (
          <ul>
            {cartItems.map((cartItem: ICartItem) => (
              <CartItem
                user={user}
                handleLoading={handleLoading}
                key={cartItem.item.id + cartItem.size}
                cartItem={cartItem}
              ></CartItem>
            ))}
          </ul>
        )}
      </div>

      {cartItems.length > 0 && (
        <footer>
          <div className="total">
            <p>Subtotal:</p>
          </div>
          <div className="price">
            <p> {formatMoney(totalPrice)}</p>
          </div>
          <div className="button">
            <ButtonCartView>View cart</ButtonCartView>
          </div>
          <div className="button2">
            {user?.cart ? (
              <CreditCardCheckout
                cart={user.cart}
                totalPrice={totalPrice}
                allItemsCount={user?.cart?.length}
                user={user}
              >
                <ButtonCartCheck>Check out</ButtonCartCheck>
              </CreditCardCheckout>
            ) : (
              <ButtonCartCheck>Check out</ButtonCartCheck>
            )}
          </div>
          <div className="text">
            <p>Shipping & taxes calculated at checkout</p>
          </div>
        </footer>
      )}
    </CartStyles>
  );
}
