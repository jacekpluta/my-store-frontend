import React from "react";
import Header from "./nav/header";
import Meta from "./meta";
import styled, { ThemeProvider } from "styled-components";
import Footer from "./homePage/footer";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY, IS_CART_OPEN_QUERY } from "../lib/queries";
import LoadingScreen from "./loadingScreen";
import { AnimatePresence, motion } from "framer-motion";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/Theme";

const StyledPage = styled.div`
  background: white;
  color: black;
`;

const Inner = styled.div`
  margin: 0 auto;
`;

function Page(props: any) {
  const currentUserQuery = useQuery(CURRENT_USER_QUERY);
  const currentUser = currentUserQuery.data;

  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Header currentUser={currentUser}></Header>
        <Meta></Meta>
        <GlobalStyle />
        <Inner>
          <AnimatePresence>
            {currentUserQuery.loading && <LoadingScreen></LoadingScreen>}
          </AnimatePresence>

          <motion.div
            key="pageAnimation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!currentUserQuery.loading && props.children}
          </motion.div>
        </Inner>
        <Footer></Footer>
      </StyledPage>
    </ThemeProvider>
  );
}

export default Page;
