import Link from "next/link";
import NavStyles from "../styles/NavStyles";
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY, IS_NAV_OPEN_QUERY } from "../../lib/queries";
import SignOut from "../user/signOut";
import { isCartOpen } from "../../lib/vars";
import styled from "styled-components";
import { Icon, Popup } from "semantic-ui-react";
import Search from "../search";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CartItemsNumber from "../styles/CartItemsNumber";
import { WhiteBar } from "../styles/WhiteBar";
import { useRouter } from "next/router";
import { isNavOpen } from "../../lib/vars";
import NavMenu from "../styles/NavMenu";
import { NavIcons } from "../styles/NavIcons";

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

  const navOpenData = useQuery(IS_NAV_OPEN_QUERY);
  const navOpen = navOpenData.data.navOpen;

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

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef && !wrapperRef?.current?.contains(event.target)) {
      isNavOpen(false);
    }
  }

  return (
    <NavStyles data-test="nav" ref={wrapperRef}>
      <NavMenu navOpen={navOpen} main={main} toggleBar={toggleBar}>
        <div id="menuToggle">
          <input
            type="checkbox"
            checked={navOpen}
            readOnly={true}
            onClick={() => {
              isNavOpen(!navOpen);
            }}
          />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <h1>Menu</h1>
            <div className="barTop"></div>
            <Link href="/">
              <li
                onClick={() => {
                  isNavOpen(!navOpen);
                }}
              >
                <a>Home</a>
              </li>
            </Link>
            <Link href="/catalog">
              <li
                onClick={() => {
                  isNavOpen(!navOpen);
                }}
              >
                <a>Catalog</a>
              </li>
            </Link>
            {currentUser.user && (
              <>
                <Link href="/cart">
                  <li
                    onClick={() => {
                      isNavOpen(!navOpen);
                    }}
                  >
                    <a>Cart</a>
                  </li>
                </Link>
                <Link href="/account">
                  <li
                    onClick={() => {
                      isNavOpen(!navOpen);
                    }}
                  >
                    <a>Accout</a>
                  </li>
                </Link>
                {matchedPermissions.length && (
                  <Link href="/sell">
                    <li
                      onClick={() => {
                        isNavOpen(!navOpen);
                      }}
                    >
                      <a>Sell</a>
                    </li>
                  </Link>
                )}

                <li
                  onClick={() => {
                    isNavOpen(!navOpen);
                  }}
                >
                  <SignOut></SignOut>
                </li>
              </>
            )}
            {!currentUser.user && (
              <Link href="/login">
                <li
                  onClick={() => {
                    isNavOpen(!navOpen);
                  }}
                >
                  <a>Login / Register</a>
                </li>
              </Link>
            )}
            <div className="footer">
              <ul>
                <li>
                  <a>
                    <Icon color="grey" size="big" name="facebook" />
                  </a>
                </li>
                <li>
                  <a>
                    <Icon color="grey" size="big" name="twitter" />
                  </a>
                </li>
                <li>
                  <a>
                    <Icon color="grey" size="big" name="instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </NavMenu>

      <NavIcons>
        <ul className="icons">
       
          {/* <li
            className="icon"
        
          >
            <Icon size="big" name="heart" />
          </li> */}
          {currentUser.user && (
            <li
              onClick={() => {
                isCartOpen(true);
              }}
              className="icon"
            >
              <div style={{ display: "inline" }}>
                <Icon size="big" name="shopping cart"     />

                {cartItems?.length === 0 ? (
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
          )}

             <li className="icon">
            <Popup
              content={<Search biggerIcon={true} />}
              on="click"
              pinned
              position="bottom right"
              offset="15px,5px"
              trigger={<Icon size="big" name="search" style={{marginRight: "25px"}} />}
            />
          </li>
        </ul>
      </NavIcons>

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

          {!currentUser.user && (
            <li>
              <Link href="/login">
                <a>Login / Register</a>
              </Link>
            </li>
          )}


          {/* <li className="icon">
            <Icon name="heart" size="big" style={{ paddingLeft: "30px" }} />
          </li> */}

          {currentUser.user && (
            <>
              <li>
                <Link href="/cart">
                  <a>Cart</a>
                </Link>
              </li>

              <li>
                <Link href="/account">
                  <a>Accout</a>
                </Link>
              </li>

              {matchedPermissions.length && (
                <li>
                  <Link href="/sell">
                    <a>Sell</a>
                  </Link>
                </li>
              )}

              <li>
                <SignOut></SignOut>
              </li>

              <li
                onClick={() => {
                  isCartOpen(true);
                }}
                className="icon"
              >
                <div style={{ display: "inline" }}>
                  <Icon size="big" name="shopping cart" />

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
              
          <li className="icon" >
            <Popup
              content={<Search biggerIcon={true} />}
              on="click"
              pinned
              position="bottom center"
              trigger={
                <Icon
                  name="search"
                  size="big"
                  style={{ paddingLeft: "15px" }}
                />
              }
            />
          </li>
            </>
          )}
        </ul>
        {main && toggleBar && <WhiteBar />}
      </nav>
    </NavStyles>
  );
}
