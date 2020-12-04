import NavStyles from "../styles/NavStyles";
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CART_LOCAL_QUERY, IS_NAV_OPEN_QUERY } from "../../lib/queries";
import { cartLocal } from "../../lib/vars";
import { useRouter } from "next/router";
import { isNavOpen } from "../../lib/vars";
import { IUser } from "./header";
import { ICartItem } from "../cart/cart";
import LeftNavBar from "./leftNavBar";
import TopNavBar from "./topNavBar";

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
  const cartLocalQuery = cartLocalData?.data?.cartLocal;
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

  //save to local storage on exit
  useEffect(() => {
    if (cartLocalQuery.length) {
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

  return (
    <NavStyles data-test="nav" ref={wrapperRef}>
      <LeftNavBar
        matchedPermissions={matchedPermissions}
        navOpen={navOpen}
        main={main}
        toggleBar={toggleBar}
        currentUser={currentUser}
        path={path}
      ></LeftNavBar>
      <TopNavBar
        navOpen={navOpen}
        itemsCount={itemsCount}
        path={path}
        currentUser={currentUser}
        matchedPermissions={matchedPermissions}
        main={main}
        toggleBar={toggleBar}
      ></TopNavBar>
    </NavStyles>
  );
}