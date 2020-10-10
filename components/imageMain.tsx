import React from "react";
import styled from "styled-components";
import { Parallax } from "react-parallax";
import { imageMain } from "../lib/images";
import { ButtonMainParalax } from "./styles/ButtonStyles";

const ImageMainStyles = styled.div`
  text-align: center;
  color: white;
`;

const InsideStylesOne = styled.p`
  font-family: "Comic Sans MS", cursive, sans-serif;
  padding: 20;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  /*   font-size: calc(14px + (100 - 14) * ((100vw - 300px) / (1600 - 300))); */
  font-size: calc(2.8em + 0.4vw);
  line-height: calc(1.1em + 0.5vw);
  padding: 0;
`;

const InsideStylesTwo = styled.p`
  font-family: "Lucida Console", Courier, monospace;
  font-size: calc(4em + 0.4vw);
  padding: 20;
  position: absolute;
  font-weight: 900;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function ImageMain() {
  return (
    <ImageMainStyles>
      <Parallax bgImage={imageMain} strength={500}>
        <div style={{ height: 500 }}>
          <InsideStylesOne>New Summer Sale</InsideStylesOne>
          <InsideStylesTwo>40% OFF</InsideStylesTwo>
          <ButtonMainParalax>Check offert</ButtonMainParalax>
        </div>
      </Parallax>
    </ImageMainStyles>
  );
}

export default ImageMain;
