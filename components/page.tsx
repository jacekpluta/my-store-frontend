import React from "react";
import Header from "./header";
import Meta from "./meta";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Footer from "./footer";

import { ReactChildren } from "react";

type theme = {
  lightBlack: string;
  black: string;
  grey: string;
  lightGrey: string;
  offWhite: string;
  maxWidth: string;
  bs: string;
  white: string;
  whiteGrey: string;
  greyish: string;
  darkerGrey: string;
  blackwhite: string;
};

const theme: theme = {
  lightBlack: "#231F20",
  black: "#20211D",
  grey: "#3A3A3A",
  lightGrey: "#E1E1E1",
  greyish: "#585E61",
  darkerGrey: "#7F8181",
  white: "#FFFFFF",
  whiteGrey: "#D0D4D7",
  offWhite: "#EDEDED",
  blackwhite: "#E3E3E3",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)",
};

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  font-size: 10px;
}


*, *:before, *:after{
  box-sizing: inherit
}

:focus {
    outline: none;
}

body{
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  line-height: 2;
  font-family: 'Rubik', sans-serif;
}
  a{
    color: ${theme.black};
  }
`;

const StyledPage = styled.div`
  background: white;
  color: black;
`;

const Inner = styled.div`
  /* max-width: ${(props) => props.theme.maxWidth}; */
  margin: 0 auto;
`;

function Page(props: any) {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Header></Header>

        <Meta></Meta>
        <GlobalStyle />

        <Inner>{props.children}</Inner>
        <Footer></Footer>
      </StyledPage>
    </ThemeProvider>
  );
}

export default Page;
