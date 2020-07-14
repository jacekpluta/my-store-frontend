import React from "react";
import CartStyles from "../styles/CartStyles";
import Supreme from "../styles/Supreme";
import CloseButton from "../styles/CloseButton";
import ButtonStyle from "../styles/ButtonStyles";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "./errorMessage";
import { CURRENT_USER_QUERY } from "./queries";
import CartItem from "./cartItem";
import { formatMoney } from "./item";
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
  const { id, name, cart } = currentUserQuery?.data?.user;
  const user = currentUserQuery?.data?.user;

  const totalPrice = cart.reduce((all, cartItem) => {
    if (cartItem.item) return all + cartItem.quantity * cartItem.item.price;
    else return;
  }, 0);

  return (
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton onClick={() => toggleCart()} title="close">
          &times;
        </CloseButton>
        <Supreme>{name} - Cart</Supreme>
        <p>
          You have {cart.length} item {cart.length === 1 ? "" : "s"} in your
          cart
        </p>
      </header>
      <ul>
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem}></CartItem>
        ))}
      </ul>
      <footer>
        <p>{formatMoney(totalPrice)}</p>
        {cart.length && (
          <CreditCardCheckout
            cart={cart}
            totalPrice={totalPrice}
            allItemsCount={cart.length}
            user={user}
          >
            <ButtonStyle>Checkout</ButtonStyle>
          </CreditCardCheckout>
        )}
      </footer>
    </CartStyles>
  );
}
