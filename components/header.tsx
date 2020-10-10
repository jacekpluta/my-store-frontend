import Nav from "./nav";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import Cart from "./cart";
import { StyledHeader } from "./styles/StyledHeader";
import React, { useEffect, useState } from "react";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

export default function Header() {
  const [image, setImage] = useState("myTransparentWhite.png");
  const [bar, setBar] = useState(false);

  const router = useRouter();
  const path = router.pathname;

  const changeLogo = () => {
    if (path === "/" && window.scrollY > 0) {
      setImage("myTransparentBlack.png");
      setBar(true);
    } else {
      setImage("myTransparentWhite.png");
      setBar(false);
    }
  };
  console.log(bar);
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

  return (
    <div style={bar ? borderBottom : borderBottomZero}>
      <StyledHeader
        style={bar && path !== "/" ? borderBottom : borderBottomZero}
      >
        <Link href="/">
          <img
            src={`/images/${image}`}
            alt="my shop"
            style={{ width: "15%", cursor: "pointer" }}
          ></img>
        </Link>

        <Nav />

        <Cart></Cart>
      </StyledHeader>
    </div>
  );
}
