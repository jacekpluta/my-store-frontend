import NavStyles from "../styles/NavStyles";
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CART_LOCAL_QUERY, IS_NAV_OPEN_QUERY } from "../../lib/queries";
import { cartLocal, isCartOpen } from "../../lib/vars";
import { useRouter } from "next/router";
import { isNavOpen } from "../../lib/vars";
import LeftNavBar from "../leftNavBar";
import TopNavBar from "./topNavBar";
import { IUser, ICartItem } from "../../lib/interfaces";
import { useMediaQuery } from "react-responsive";
import { CSSTransition } from "react-transition-group";
import { Icon, TransitionGroup, Popup, Search } from "semantic-ui-react";
import { AnimationStyles } from "../styles/AnimationStyles";
import CartItemsNumber from "../styles/CartItemsNumber";
import { NavIcons } from "../styles/NavIcons";

export default function Nav({ currentUser }: IUser) {
  const [main, setMain] = useState(false);
  const [toggleBar, setToggleBar] = useState(true);
  const [itemsCount, setItemsCount] = useState(0);
  const navOpenData = useQuery(IS_NAV_OPEN_QUERY);
  const navOpen: boolean = navOpenData.data.navOpen;
  const router = useRouter();
  const path: string = router.pathname;
  const cartLocalData = useQuery(CART_LOCAL_QUERY);
  const cartItems = currentUser?.user?.cart;
  const cartLocalItems = cartLocalData?.data?.cartLocal;
  const permissionsNeeded = ["ADMIN", "PERRMISSIONUPDATE"];

  const matchedPermissions = currentUser?.user?.permissions?.filter(
    (permissionTheyHave: string) =>
      permissionsNeeded.includes(permissionTheyHave)
  );

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

  //save localstorage to apollo on start
  useEffect(() => {
    const localStorageCart = JSON.parse(localStorage.getItem("cartLocal"));
    if (localStorageCart) cartLocal([...localStorageCart]);
  }, []);

  // save to local storage on exit
  useEffect(() => {
    window.onbeforeunload = function () {
      localStorage.setItem("cartLocal", JSON.stringify(cartLocalItems));
    };
  }, [cartLocalItems]);

  const cartItemsCount = cartItems?.reduce(
    (all, cartItem) => all + cartItem.quantity,
    0
  );

  const cartItemsLocalCount = cartLocalItems?.reduce(
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

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef && !wrapperRef?.current?.contains(event.target)) {
      isNavOpen(false);
    }
  };

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1000px)" });

  return (
    <NavStyles data-test="nav" ref={wrapperRef}>
      {isTabletOrMobile ? (
        <LeftNavBar
          matchedPermissions={matchedPermissions}
          navOpen={navOpen}
          main={main}
          toggleBar={toggleBar}
          currentUser={currentUser}
          path={path}
          itemsCount={itemsCount}
        ></LeftNavBar>
      ) : (
        <TopNavBar
          navOpen={navOpen}
          itemsCount={itemsCount}
          path={path}
          currentUser={currentUser}
          matchedPermissions={matchedPermissions}
          main={main}
          toggleBar={toggleBar}
        ></TopNavBar>
      )}

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
    </NavStyles>
  );
}
