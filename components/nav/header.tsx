import Nav from "./nav";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import Cart from "../cart/cart";
import { StyledHeader } from "../styles/StyledHeader";
import React, { useEffect, useState } from "react";
import { Dimmer } from "../styles/Dimmer";
import { IS_CART_OPEN_QUERY, IS_NAV_OPEN_QUERY } from "../../lib/queries";
import { useQuery } from "@apollo/react-hooks";
import { IItem } from "../cart/cartItem";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

export interface IUser {
  currentUser: {
    user: {
      id: string;
      name: string;
      email: string;
      permissions: Array<string>;
      cart: [
        {
          item: IItem;
          quantity: number;
          size: number;
        }
      ];
    };
  };
}

export default function Header({ currentUser }: IUser) {
  const [image, setImage] = useState("myTransparentWhite.png");
  const [bar, setBar] = useState(false);
  console.log(currentUser);
  const router = useRouter();
  const path = router.pathname;

  const cartOpenQuery = useQuery(IS_CART_OPEN_QUERY);
  const navOpenQuery = useQuery(IS_NAV_OPEN_QUERY);

  const cartOpen = cartOpenQuery.data.cartOpen;
  const navOpen = navOpenQuery.data.navOpen;

  const changeLogo = () => {
    if (path === "/" && window.scrollY > 0) {
      setImage("myTransparentBlack.png");
      setBar(true);
    } else {
      setImage("myTransparentWhite.png");
      setBar(false);
    }
  };

  useEffect(() => {
    if (path !== "/") {
      setImage("myTransparentBlack.png");
      setBar(true);
    } else {
      setImage("myTransparentWhite.png");
      setBar(false);
    }
  }, [path]);

  const borderBottom = {
    borderBottom: "1px solid #E3E3E3",
  };

  const borderBottomZero = {
    borderBottom: "0px solid #E3E3E3",
  };

  useEffect(() => {
    if (path === "/") {
      window.addEventListener("scroll", changeLogo);
    } else {
      window.removeEventListener("scroll", changeLogo);
    }

    return () => window.removeEventListener("scroll", changeLogo);
  }, [path]);

  const handleScroll = () => {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
  };

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      if (path === "/") {
        header.classList.toggle("sticky", false);
        window.addEventListener("scroll", handleScroll);
      } else {
        header.classList.toggle("sticky", true);
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [path]);

  return (
    <>
      <StyledHeader
        style={
          bar && path === "/"
            ? borderBottomZero
            : bar && path !== "/"
            ? borderBottom
            : borderBottomZero
        }
      >
        <Link href="/">
          <div className="logo">
            <img src={`/images/${image}`} alt="my shop"></img>
          </div>
        </Link>

        <Nav currentUser={currentUser} />
        {cartOpen || navOpen ? <Dimmer></Dimmer> : <></>}
        {<Cart></Cart>}
      </StyledHeader>

      {path !== "/" && (
        <div style={{ height: "100px", visibility: "hidden" }}></div>
      )}
    </>
  );
}
