import Link from "next/link";
import NavStyles from "../styles/NavStyles";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "../../lib/queries";
import SignOut from "../user/signOut";

import styled from "styled-components";
import { Icon, Popup } from "semantic-ui-react";
import Search from "../search";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CartItemsNumber from "../styles/CartItemsNumber";
import { WhiteBar } from "../styles/WhiteBar";
import { useRouter } from "next/router";
import { isCartOpen } from "../../lib/vars";

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

  const [main, setMain] = useState(false);
  const [toggleBar, setToggleBar] = useState(true);

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

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setToggleBar(false);
    } else {
      setToggleBar(true);
    }
  };

  useEffect(() => {
    if (path === "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [path]);

  const cartItems = currentUserQuery?.data?.user?.cart;
  const cartItemsCount = !cartItems
    ? ""
    : cartItems.reduce(
        (all: any[], cartItem: any) => all + cartItem.quantity,
        0
      );

  const permissionsNeeded = ["ADMIN", "PERRMISSIONUPDATE"];
  const matchedPermissions = currentUser?.user?.permissions?.filter(
    (permissionTheyHave: string) =>
      permissionsNeeded.includes(permissionTheyHave)
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
            <Link href="/catalog">
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

              {!matchedPermissions.length && (
                <li>
                  <Link href="/sell">
                    <a>Sell</a>
                  </Link>
                </li>
              )}

              <li>
                <SignOut></SignOut>
              </li>

              <li className="icon">
                <Popup
                  content={<Search biggerIcon={true} />}
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

              <li
                onClick={() => {
                  isCartOpen(true);
                }}
                className="icon"
              >
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
              <Link href="/login">
                <a>Sign In / Register</a>
              </Link>
            </li>
          )}
        </ul>
        {main && toggleBar && <WhiteBar />}
      </nav>
    </NavStyles>
  );
}
