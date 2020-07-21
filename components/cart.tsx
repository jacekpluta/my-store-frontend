import React from "react";
import CartStyles from "../styles/CartStyles";
import Supreme from "../styles/Supreme";
import CloseButton from "../styles/CloseButton";
import ButtonStyle from "../styles/ButtonStyles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./Queries";
import CartItem from "./CartItem";
import formatMoney from "./FormatMoney";
import CreditCardCheckout from "./CreditCardCheckout";

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
  console.log(currentUserQuery);
  const user = currentUserQuery?.data?.user;

  const totalPrice = user?.cart
    ? user.cart.reduce((all, cartItem) => {
        if (cartItem.item) return all + cartItem.quantity * cartItem.item.price;
        else return;
      }, 0)
    : "";

  if (user) {
    return (
      <CartStyles open={cartOpen}>
        <header>
          <CloseButton onClick={() => toggleCart()} title="close">
            &times;
          </CloseButton>
          <Supreme>{user.name} - Cart</Supreme>
          <p>
            You have {user.cart.length} item {user.cart.length === 1 ? "" : "s"}{" "}
            in your cart
          </p>
        </header>
        <ul>
          {user.cart.map((cartItem) => (
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
              <ButtonStyle
                onClick={() => {
                  toggleCart();
                }}
              >
                Checkout
              </ButtonStyle>
            </CreditCardCheckout>
          )}
        </footer>
      </CartStyles>
    );
  } else {
    return "You are not logged in";
  }
}
