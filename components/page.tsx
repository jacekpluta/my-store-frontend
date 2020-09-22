import React from "react";
import Header from "./header";
import Meta from "./meta";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Gallery from "./gallery";

type theme = {
  red: string;
  black: string;
  gray: string;
  lightGrey: string;
  offWhite: string;
  maxWidth: string;
  bs: string;
};

const theme: theme = {
  red: "#FF0000",
  black: "#393939",
  gray: "#3A3A3A",
  lightGrey: "#E1E1E1",
  offWhite: "#EDEDED",
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
body{
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  line-height: 2;
  font-family: "Arial", Times, serif;
}
  a{
    color: ${theme.black};
  }
`;

const StyledPage = styled.div`
  background: grey;
  color: black;
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2 rem;
`;

export interface PageProps {}

export interface PageState {}

class Page extends React.Component<PageProps, PageState> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Header></Header>
          <Gallery></Gallery>
          <Meta></Meta>
          <GlobalStyle />

          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
