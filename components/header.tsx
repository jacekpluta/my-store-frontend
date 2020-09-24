import Nav from "./nav";
import Link from "next/link";
import Router from "next/router";
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

<<<<<<< HEAD
export default function Header() {
  const [image, setImage] = useState("myTransparentWhite.png");
=======
const Logo = styled.h1``;
>>>>>>> jacagaca/my-store-frontend.git/master

  const changeLogoToWhite = () => {
    if (window.scrollY > 0) {
      setImage("myTransparentBlack.png");
    } else {
      setImage("myTransparentWhite.png");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeLogoToWhite);
    return () => window.removeEventListener("scroll", changeLogoToWhite);
  }, []);

  return (
    <StyledHeader>
<<<<<<< HEAD
      <Link href="/">
        <img
          src={`/images/${image}`}
          alt="my shop"
          style={{ width: "15%", cursor: "pointer" }}
        ></img>
      </Link>

      <Nav />
=======
      <div className="bar">
        <Logo>
          <Link href="/">
            <a></a>
          </Link>
        </Logo>
>>>>>>> jacagaca/my-store-frontend.git/master

      <Cart></Cart>
    </StyledHeader>
  );
}
