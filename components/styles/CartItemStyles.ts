import styled from "styled-components";

export const CartItemStyles = styled.li`
  -webkit-box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 0px 0 10px;

  display: grid;
  grid-template-columns: 1fr 1.5fr 55px;
  grid-template-rows: auto auto auto 0.9fr;
  gap: 0px 10px;
  grid-template-areas:
    "image title close"
    "image size size"
    "image price price"
    "image counter counter";

  .image {
    img {
      height: 140px;
      width: 100px;
    }
    grid-area: image;
  }

  .title {
    grid-area: title;
    p {
      color: ${(props) => props.theme.greyish};
      font-weight: 700;
      font-size: 16px;
    }
  }

  .size {
    grid-area: size;
    p {
      color: ${(props) => props.theme.greyish};
      font-size: 14px;
      font-weight: 100;
    }
  }

  .price {
    color: ${(props) => props.theme.greyish};
    grid-area: price;
    p {
      font-size: 15px;
      font-weight: 100;
    }
  }

  .counter {
    grid-area: counter;
    align-self: center;
    justify-self: start;
    padding-bottom: 10px;
  }

  .close {
    justify-self: start;
    align-self: start;
    grid-area: close;
    margin-top: -7px;
  }
`;
