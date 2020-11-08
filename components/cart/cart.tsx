import { useQuery } from "@apollo/react-hooks";
import React, { useEffect, useRef, useState } from "react";
import { emptyCart } from "../../lib/images";
import { CURRENT_USER_QUERY, IS_CART_OPEN_QUERY } from "../../lib/queries";
import { isCartOpen } from "../../lib/vars";
import Error from "../errorMessage";
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
  const [isLoading, setIsLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
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
    if (wrapperRef && !wrapperRef?.current?.contains(event.target)) {
      isCartOpen(false);
    }
  }

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  useEffect(() => {
    if (currentUserQuery.data) {
      if (wrapperRef && wrapperRef.current) {
        var position = wrapperRef.current.getBoundingClientRect();
        if (position.left < window.innerWidth) {
          setAnimate(true);
        }
      }
    }
  }, [wrapperRef, wrapperRef.current]);

  if (cartOpenData.loading) return <p>Loading...</p>;
  if (cartOpenData.error) return <Error error={cartOpenData.error}></Error>;

  if (user) {
    return (
      <CartStyles open={cartOpen} ref={wrapperRef} animate={animate}>
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
            {user?.cart?.length > 0 && (
              <>
                {" "}
                - {user?.cart?.length} item{user?.cart?.length === 1 ? "" : "s"}
              </>
            )}
          </p>
        </div>

        <div className="cartItems">
          {user?.cart?.length === 0 ? (
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
              {user?.cart?.map((cartItem: ICartItem) => (
                <CartItem
                  handleLoading={handleLoading}
                  key={cartItem.id}
                  cartItem={cartItem}
                ></CartItem>
              ))}
            </ul>
          )}
        </div>

        {user?.cart?.length > 0 && (
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
              <CreditCardCheckout
                cart={user.cart}
                totalPrice={totalPrice}
                allItemsCount={user.cart.length}
                user={user}
              >
                <ButtonCartCheck>Check out</ButtonCartCheck>
              </CreditCardCheckout>
            </div>
            <div className="text">
              <p>Shipping & taxes calculated at checkout</p>
            </div>
          </footer>
        )}
      </CartStyles>
    );
  } else {
    return <></>;
  }
}
