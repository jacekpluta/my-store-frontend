import Link from "next/link";
import NavStyles from "./styles/NavStyles";

import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "./Queries";
import SignOut from "./SignOut";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_CART_MUTATION } from "./Cart";
import styled from "styled-components";

import { TransitionGroup, CSSTransition } from "react-transition-group";

const Dot = styled.div`
  background: ${(props) => props.theme.red};
  color: white;
  border-radius: 100%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: 100;
  font-feature-settings: "tnum";
`;

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 1s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(2) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(2) rotateX(0.5turn);
  }
`;
export default function Nav() {
  const currentUserQuery = useQuery(CURRENT_USER_QUERY);
  const [toggleCart, toggleCartMutation] = useMutation(TOGGLE_CART_MUTATION);

  const currentUser = currentUserQuery.data;

  if (currentUserQuery.loading || toggleCartMutation.loading)
    return <p>Loading...</p>;
  if (currentUserQuery.error || toggleCartMutation.error)
    return <p>Error: {currentUserQuery.error}</p>;

  const cartItems = currentUserQuery?.data?.user?.cart;
  const cartItemsCount = !cartItems
    ? ""
    : cartItems.reduce((all, cartItem) => all + cartItem.quantity, 0);

  return (
    <NavStyles data-test="nav">
      {currentUser && currentUser.user ? (
        <p>Hello {currentUser.user.name}</p>
      ) : (
        ""
      )}

      <Link href="/items">
        <a>Items</a>
      </Link>

      {currentUser && currentUser.user && (
        <>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
          <Link href="/account">
            <a>Accout</a>
          </Link>

          <Link href="/sell">
            <a>Sell</a>
          </Link>

          <SignOut></SignOut>
          <button onClick={() => toggleCart()}>
            My Cart
            {cartItems.length === 0 ? (
              " (0)"
            ) : (
              <AnimationStyles>
                <TransitionGroup>
                  <CSSTransition
                    unmountOnExit
                    classNames="count"
                    className="count"
                    key={cartItemsCount}
                    timeout={{ enter: 1000, exit: 1000 }}
                  >
                    <Dot>{cartItemsCount}</Dot>
                  </CSSTransition>
                </TransitionGroup>
              </AnimationStyles>
            )}
          </button>
        </>
      )}

      {currentUser && !currentUser.user ? (
        <Link href="/signin">
          <a>Sign In</a>
        </Link>
      ) : (
        ""
      )}
    </NavStyles>
  );
}
