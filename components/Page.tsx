import React from "react";
import Header from "./Header";
import Meta from "./Meta";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

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
@font-face {
  font-family: 'optimusprinceps';
  src: url()("/static/optimusprinceps.woff2")
  format("woff2");
  font-weight:normal;
  font-style: normal;
}
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
  font-family: 'optimusprinceps';
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
          <Meta></Meta>
          <GlobalStyle />

          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
