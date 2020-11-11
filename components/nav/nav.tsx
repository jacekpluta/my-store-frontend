import Link from "next/link";
import NavStyles from "../styles/NavStyles";
import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  CART_LOCAL_QUERY,
  CREATE_USER_MUTATION,
  CURRENT_USER_QUERY,
  IS_NAV_OPEN_QUERY,
} from "../../lib/queries";
import SignOut from "../user/signOut";
import { cartLocal, isCartOpen } from "../../lib/vars";
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
import faker from "faker";
import { IUser } from "./header";
import { ICartItem } from "../cart/cart";

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

export default function Nav({ currentUser }: IUser) {
  const [main, setMain] = useState(false);
  const [toggleBar, setToggleBar] = useState(true);
  const [itemsCount, setItemsCount] = useState(0);

  const navOpenData = useQuery(IS_NAV_OPEN_QUERY);
  const navOpen = navOpenData.data.navOpen;

  const router = useRouter();
  const path = router.pathname;

  const cartLocalData = useQuery(CART_LOCAL_QUERY);
  const cartItems = currentUser?.user?.cart;
  const cartLocalQuery = cartLocalData?.data?.cartLocal;

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

  //save to local storage on exit
  useEffect(() => {
    if (cartLocalQuery.length !== 0) {
      window.onbeforeunload = function () {
        localStorage.setItem("cartLocal", JSON.stringify(cartLocalQuery));
      };
    }
  }, [cartLocalQuery]);

  //save localstorage to apollo on start
  useEffect(() => {
    const localStorageCart = JSON.parse(localStorage.getItem("cartLocal"));
    if (localStorageCart) cartLocal([...localStorageCart]);
  }, []);

  const cartItemsCount = cartItems?.reduce(
    (all, cartItem) => all + cartItem.quantity,
    0
  );

  const cartItemsLocalCount = cartLocalQuery?.reduce(
    (all: number, cartItem: ICartItem) => all + cartItem.quantity,
    0
  );

  useEffect(() => {
    if (cartItemsLocalCount) {
      setItemsCount(cartItemsLocalCount);
    }
    if (cartItemsCount) {
      setItemsCount(cartItemsCount);
    }
  }, [cartItemsCount, cartItemsLocalCount]);

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

  const [createUser, createUserData] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  const LeftNavBar = () => (
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
          {currentUser?.user && (
            <p>
              Hello, <b>{currentUser?.user?.name}!</b>
            </p>
          )}

          <div className="barTop"></div>
          <Link href="/">
            <li
              onClick={() => {
                isNavOpen(!navOpen);
              }}
            >
              <a className={path === "/" ? "add" : "none"}>Home</a>
            </li>
          </Link>
          <Link href="/catalog">
            <li
              onClick={() => {
                isNavOpen(!navOpen);
              }}
            >
              <a className={path === "/catalog" ? "add" : "none"}>Catalog</a>
            </li>
          </Link>

          <Link href="/cart">
            <li
              onClick={() => {
                isNavOpen(!navOpen);
              }}
            >
              <a className={path === "/cart" ? "add" : "none"}>Cart</a>
            </li>
          </Link>

          {currentUser?.user && (
            <>
              <Link href="/account">
                <li
                  onClick={() => {
                    isNavOpen(!navOpen);
                  }}
                >
                  <a className={path === "/account" ? "add" : "none"}>Accout</a>
                </li>
              </Link>

              {matchedPermissions.length > 0 && (
                <Link href="/sell">
                  <li
                    onClick={() => {
                      isNavOpen(!navOpen);
                    }}
                  >
                    <a className={path === "/sell" ? "add" : "none"}>Sell</a>
                  </li>
                </Link>
              )}

              <li
                onClick={() => {
                  isNavOpen(!navOpen);
                }}
              >
                <SignOut path={path}></SignOut>
              </li>
            </>
          )}
          {!currentUser?.user && (
            <>
              <Link href="/login">
                <li
                  onClick={() => {
                    isNavOpen(!navOpen);
                  }}
                >
                  <a className={path === "/login" ? "add" : "none"}>
                    Login / Register
                  </a>
                </li>
              </Link>

              <li
                onClick={async () => {
                  const name = `guest-${faker.random.number()}`;
                  const email = faker.internet.email();
                  const password = faker.internet.password();

                  await createUser({
                    variables: {
                      email,
                      name,
                      password,
                    },
                  });
                }}
              >
                <a>Guest login</a>
              </li>
            </>
          )}
          <div className="footer">
            <ul>
              <li>
                <a>
                  <Icon
                    className="icn"
                    color="grey"
                    size="big"
                    name="facebook"
                  />
                </a>
              </li>
              <li>
                <a>
                  <Icon
                    className="icn"
                    color="grey"
                    size="big"
                    name="twitter"
                  />
                </a>
              </li>
              <li>
                <a>
                  <Icon
                    className="icn"
                    color="grey"
                    size="big"
                    name="instagram"
                  />
                </a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </NavMenu>
  );

  const TopNavBar = () => (
    <>
      <NavIcons>
        <ul className="icons">
          <li
            onClick={() => {
              isCartOpen(true);
            }}
            className="icon"
          >
            <div style={{ display: "inline" }}>
              <Icon className="icn" size="big" name="shopping cart" />

              <AnimationStyles>
                <TransitionGroup>
                  <CSSTransition
                    unmountOnExit
                    classNames="count"
                    className="count"
                    key={itemsCount}
                    timeout={{ enter: 100, exit: 100 }}
                  >
                    <CartItemsNumber>{itemsCount}</CartItemsNumber>
                  </CSSTransition>
                </TransitionGroup>
              </AnimationStyles>
            </div>
          </li>

          <li className="icon">
            <Popup
              content={<Search biggerIcon={true} />}
              on="click"
              pinned
              position="bottom right"
              trigger={
                <Icon
                  className="icn"
                  name="search"
                  size="big"
                  style={{ paddingLeft: "15px" }}
                />
              }
            />
          </li>
        </ul>
      </NavIcons>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a className={path === "/" ? "add" : "none"}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/catalog">
              <a className={path === "/catalog" ? "add" : "none"}>Catalog</a>
            </Link>
          </li>

          {!currentUser?.user && (
            <li>
              <Link href="/login">
                <a className={path === "/login" ? "add" : "none"}>
                  Login / Register
                </a>
              </Link>
            </li>
          )}

          <li>
            <Link href="/cart">
              <a className={path === "/cart" ? "add" : "none"}>Cart</a>
            </Link>
          </li>

          <li
            onClick={() => {
              isCartOpen(true);
            }}
            className="icon"
          >
            <div style={{ display: "inline" }}>
              <Icon className="icn" size="big" name="shopping cart" />

              <AnimationStyles>
                <TransitionGroup>
                  <CSSTransition
                    unmountOnExit
                    classNames="count"
                    className="count"
                    key={itemsCount}
                    timeout={{ enter: 100, exit: 100 }}
                  >
                    <CartItemsNumber>{itemsCount}</CartItemsNumber>
                  </CSSTransition>
                </TransitionGroup>
              </AnimationStyles>
            </div>
          </li>

          <li className="icon">
            <Popup
              content={<Search biggerIcon={true} />}
              on="click"
              pinned
              position="bottom right"
              trigger={
                <Icon
                  className="icn"
                  name="search"
                  size="big"
                  style={{ paddingLeft: "15px" }}
                />
              }
            />
          </li>

          {currentUser?.user && (
            <>
              <li>
                <Link href="/account">
                  <a className={path === "/account" ? "add" : "none"}>Accout</a>
                </Link>
              </li>

              {matchedPermissions.length > 0 && (
                <li>
                  <Link href="/sell">
                    <a className={path === "/sell" ? "add" : "none"}>Sell</a>
                  </Link>
                </li>
              )}

              <li>
                <SignOut path={path}></SignOut>
              </li>
            </>
          )}
        </ul>
        {main && toggleBar && <WhiteBar />}
      </nav>
    </>
  );

  return (
    <NavStyles data-test="nav" ref={wrapperRef}>
      <LeftNavBar></LeftNavBar>
      <TopNavBar></TopNavBar>
    </NavStyles>
  );
}
