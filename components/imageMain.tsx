import React from "react";
import styled from "styled-components";
import { Parallax } from "react-parallax";
import { imageMain } from "../lib/images";
import { ButtonMainParalax } from "./styles/ButtonStyles";
import Link from "next/link";

const ImageMainStyles = styled.div`
  text-align: center;
  color: white;
  p {
    margin: 0;
    padding: 0;
  }
  p:nth-child(1) {
    font-family: "Comic Sans MS", cursive, sans-serif;
    margin-top: 100px;
    font-weight: 600;
    font-size: calc(2.8em + 0.4vw);
    line-height: calc(1.1em + 0.5vw);
    padding: 0;
  }

  p:nth-child(2) {
    font-family: "Comic Sans MS", Courier, monospace;
    font-size: calc(4em + 0.4vw);
    padding: 20;
    font-weight: 900;
  }
`;

function ImageMain() {
  return (
    <ImageMainStyles>
      <Parallax bgImage={imageMain} strength={500}>
        <div style={{ height: 320 }}>
          <p>New Summer Sale</p>
          <p>40% OFF</p>
          <Link
            href={{
              pathname: "/catalog",
            }}
          >
            <ButtonMainParalax>Check offert</ButtonMainParalax>
          </Link>
        </div>
      </Parallax>
    </ImageMainStyles>
  );
}

export default ImageMain;
