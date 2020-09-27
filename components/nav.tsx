import Link from "next/link";
import NavStyles from "./styles/NavStyles";

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "./queries";
import SignOut from "./signOut";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_CART_MUTATION } from "./cart";
import styled from "styled-components";
import { Icon, Popup } from "semantic-ui-react";
import Search from "./search";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CartItemsNumber from "./styles/CartItemsNumber";

import { WhiteBar } from "./styles/WhiteBar";
import { useRouter } from "next/router";

const AnimationStyles = styled.span`
  position: absolute;
  .count {
    transition: all 0.3s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(1.2);
  }
  .count-enter-active {
  }
  .count-exit {
    position: absolute;
  }
  .count-exit-active {
    transform: scale(1.2);
  }
`;

export default function Nav() {
  const currentUserQuery = useQuery(CURRENT_USER_QUERY);
  const [toggleCart, toggleCartMutation] = useMutation(TOGGLE_CART_MUTATION);
  const [main, setMain] = useState(false);

  const currentUser = currentUserQuery.data;

  const router = useRouter();
  const path = router.pathname;
  useEffect(() => {
    if (path === "/") {
      setMain(true);
    } else {
      setMain(false);
    }
  }, [path]);

  if (currentUserQuery.loading || toggleCartMutation.loading)
    return <p>Loading...</p>;
  if (currentUserQuery.error || toggleCartMutation.error)
    return <p>Error: {currentUserQuery.error}</p>;

  const cartItems = currentUserQuery?.data?.user?.cart;
  const cartItemsCount = !cartItems
    ? ""
    : cartItems.reduce(
        (all: any[], cartItem: any) => all + cartItem.quantity,
        0
      );

  return (
    <NavStyles data-test="nav">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/items">
              <a>Catalog</a>
            </Link>
          </li>
          {currentUser.user && (
            <>
              <li>
                <Link href="/orders">
                  <a>Orders</a>
                </Link>
              </li>

              <li>
                <Link href="/account">
                  <a>Accout</a>
                </Link>
              </li>

              <li>
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
              </li>

              <li>
                <SignOut></SignOut>
              </li>

              <li className="icon">
                <Popup
                  content={<Search />}
                  on="click"
                  pinned
                  position="bottom center"
                  offset="0, 10px"
                  trigger={<Icon name="search" />}
                />
              </li>

              <li className="icon">
                <Icon name="heart" />
              </li>

              <li onClick={() => toggleCart()} className="icon">
                <div style={{ display: "inline" }}>
                  <Icon name="shopping bag" />

                  {cartItems.length === 0 ? (
                    <CartItemsNumber> 0</CartItemsNumber>
                  ) : (
                    <AnimationStyles>
                      <TransitionGroup>
                        <CSSTransition
                          unmountOnExit
                          classNames="count"
                          className="count"
                          key={cartItemsCount}
                          timeout={{ enter: 100, exit: 100 }}
                        >
                          <CartItemsNumber>{cartItemsCount}</CartItemsNumber>
                        </CSSTransition>
                      </TransitionGroup>
                    </AnimationStyles>
                  )}
                </div>
              </li>
            </>
          )}

          {!currentUser.user && (
            <li>
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </li>
          )}
        </ul>
        {main && <WhiteBar />}
      </nav>
    </NavStyles>
  );
}
