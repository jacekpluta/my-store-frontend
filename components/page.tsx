import React from "react";
import Header from "./nav/header";
import Meta from "./meta";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Footer from "./homePage/footer";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY, IS_CART_OPEN_QUERY } from "../lib/queries";
import LoadingScreen from "./loadingScreen";
import { AnimatePresence, motion } from "framer-motion";

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
  isCartOpen: Boolean;
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
  isCartOpen: false,
};

const StyledPage = styled.div`
  background: white;
  color: black;
`;

const Inner = styled.div`
  /* max-width: ${(props) => props.theme.maxWidth}; */
  margin: 0 auto;
`;

function Page(props: any) {
  const cartOpenData = useQuery(IS_CART_OPEN_QUERY);
  const isCartOpen = cartOpenData.data.cartOpen;

  const currentUserQuery = useQuery(CURRENT_USER_QUERY);
  const currentUser = currentUserQuery.data;

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
  overflow: ${isCartOpen ? "hidden" : "scroll"};
}
  a{
    color: ${theme.black};
  }
`;

  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence>
        <StyledPage>
          <Header currentUser={currentUser}></Header>

          <Meta></Meta>
          <GlobalStyle />
          <Inner>
            <AnimatePresence>
              {currentUserQuery.loading && !currentUserQuery?.data?.user && (
                <LoadingScreen></LoadingScreen>
              )}
            </AnimatePresence>
            <AnimatePresence>
              <motion.div
                key="animation2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {!currentUserQuery.loading &&
                  currentUserQuery?.data?.user &&
                  props.children}
              </motion.div>
            </AnimatePresence>
          </Inner>
          <Footer></Footer>
        </StyledPage>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default Page;
