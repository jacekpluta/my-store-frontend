import styled from "styled-components";
import Nav from "./nav";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import Cart from "./cart";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

const Logo = styled.h1``;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${(props) => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1ft auto;
    border-bottom: 1px solid ${(props) => props.theme.lightGrey};
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a></a>
          </Link>
        </Logo>

        <Nav />
      </div>
      <div className="sub-bar">
        <Cart></Cart>
      </div>
    </StyledHeader>
  );
}
