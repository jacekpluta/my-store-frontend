import React from "react";
import styled from "styled-components";
import { infoImages } from "../lib/images";

export const InfoStyles = styled.div`
  margin: 3% 7% 3% 7%;
  max-width: 1500px;
  display: grid;
  align-items: center;
  grid-gap: 3rem;
  grid-template-columns: 30% 30% 30%;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

export const Block = styled.div`
  border: 1px solid ${(props) => props.theme.whiteGrey};
  display: flex;
  height: 80px;
  -webkit-box-shadow: 10px 10px 24px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 24px -11px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 24px -11px rgba(0, 0, 0, 0.75);

  img {
    width: 10%;
    margin: 25px 20px 20px 20px;
  }
  h3 {
    margin: 25px 0 0 0;
  }
  p {
    font-size: 12px;
    color: ${(props) => props.theme.grey};

    margin-right: 20px;
  }
`;

function Info() {
  return (
    <InfoStyles>
      <Block>
        <img src={infoImages[0]}></img>
        <span>
          <h3>Support 24/7</h3>
          <p>Contact us at any time!</p>
        </span>
      </Block>
      <Block>
        <img src={infoImages[1]}></img>
        <span>
          <h3>Free Returns</h3>
          <p>Return without downsize!</p>
        </span>
      </Block>
      <Block>
        <img src={infoImages[2]}></img>
        <span>
          <h3>Fast Delivery</h3>
          <p>Same day shipment!</p>
        </span>
      </Block>
    </InfoStyles>
  );
}

export default Info;
