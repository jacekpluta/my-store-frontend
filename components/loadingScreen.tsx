import styled from "styled-components";
import React from "react";
import { mainLogo } from "../lib/images";
import { motion } from "framer-motion";

const LoadingScreenStyles = styled.div`
  img {
    text-align: center;
    position: fixed;
    top: 0px;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
  }
  .loader:after {
    content: "";
    width: 200px;
    height: 200px;
    position: absolute;
    top: 0px;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    border: 6px solid ${(props) => props.theme.black};
    border-top: 6px dotted ${(props) => props.theme.black};
    border-bottom: 6px dotted ${(props) => props.theme.black};
    border-radius: 50%;
    animation: loadingAnimation 5s infinite;
  }
  .loader:before {
    font-family: "Lobster", cursive;
    font-size: 20px;
    letter-spacing: 1px;
    color: white;
    content: "";
    position: absolute;
    top: 57%;
    text-align: center;
    right: 0;
    left: 0;
    margin: auto;
  }

  @keyframes loadingAnimation {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(360deg);
    }
  }
`;

function LoadingScreen() {
  return (
    <motion.div
      key="animation"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -200 }}
      transition={{ duration: 1 }}
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        background: "white",
        zIndex: 99,
      }}
    >
      <LoadingScreenStyles>
        <img src={mainLogo} />
        <div className="loader"></div>
      </LoadingScreenStyles>
    </motion.div>
  );
}

export default LoadingScreen;
