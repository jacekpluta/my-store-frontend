import Nav from "./nav";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import Cart from "../cart/cart";
import { HeaderStyles } from "../styles/HeaderStyles";
import React, { useEffect, useState } from "react";
import { Dimmer } from "../styles/Dimmer";
import { IS_CART_OPEN_QUERY, IS_NAV_OPEN_QUERY } from "../../lib/queries";
import { useQuery } from "@apollo/react-hooks";
import { IUser } from "../../lib/interfaces";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

export default function Header({ currentUser }: IUser) {
  const [image, setImage] = useState("myTransparentWhite.png");
  const [sticky, setSticky] = useState(false);
  const router = useRouter();
  const path = router.pathname;
  const cartOpenQuery = useQuery(IS_CART_OPEN_QUERY);
  const navOpenQuery = useQuery(IS_NAV_OPEN_QUERY);
  const cartOpen = cartOpenQuery.data.cartOpen;
  const navOpen = navOpenQuery.data.navOpen;

  const changeLogo = () => {
    if (path === "/" && window.scrollY > 0) {
      setImage("myTransparentBlack.png");
      setSticky(true);
    } else if (path === "/" && window.scrollY === 0) {
      setImage("myTransparentWhite.png");
      setSticky(false);
    } else {
      setImage("myTransparentBlack.png");
      setSticky(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeLogo);

    if (path === "/") {
      setImage("myTransparentWhite.png");
      setSticky(false);
    }

    if (path !== "/") {
      setImage("myTransparentBlack.png");
      setSticky(true);
    }
    return () => window.removeEventListener("scroll", changeLogo);
  }, [path]);

  return (
    <HeaderStyles sticky={sticky}>
      <Link href="/">
        <div className="logo">
          <img src={`/images/${image}`} alt="my shop"></img>
        </div>
      </Link>

      <Nav currentUser={currentUser} />
      {cartOpen || navOpen ? <Dimmer></Dimmer> : <></>}
      {<Cart></Cart>}
    </HeaderStyles>
  );
}
