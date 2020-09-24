import Link from "next/link";
import NavStyles from "./styles/NavStyles";

import React, { useState } from "react";
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
import WhiteIcon from "./styles/WhiteIcon";
import { motion } from "framer-motion";
import { WhiteBar } from "./styles/WhiteBar";

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

  const currentUser = currentUserQuery.data;
  const [image, setImage] = useState("myTransparentWhite.png");

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
              <a>Shop Now!</a>
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

              <WhiteIcon>
                <Popup
                  content={<Search />}
                  on="click"
                  pinned
                  position="bottom center"
                  offset="0, 10px"
                  trigger={<Icon name="search" />}
                />
              </WhiteIcon>

              <WhiteIcon>
                <Icon name="heart" />
              </WhiteIcon>

              <WhiteIcon onClick={() => toggleCart()}>
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
              </WhiteIcon>
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
        <WhiteBar />
      </nav>
    </NavStyles>
  );
}
