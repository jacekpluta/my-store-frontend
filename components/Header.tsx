import styled from "styled-components";
import Nav from "./Nav";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import Cart from "./Cart";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

const Logo = styled.h1`
  font-size: 3rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5 rem 1 rem;
    background: ${(props) => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

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
            <a>MyShop</a>
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
