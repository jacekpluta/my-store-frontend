import styled, { keyframes, css } from "styled-components";

const loading = keyframes`

  from{transform:rotate(360deg)} 
  to{transform:rotate(0deg) }
`;

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0px);
  }
`;
const slideOutAnimation = keyframes`
  from {
    transform: translateX(0px);
  }

  to {
    transform: translateX(100%);
  }
`;

interface Props {
  open: Boolean;
  animate: Boolean;
}

const showCart = css`
  animation: ${slideInAnimation} 1s forwards;
  visibility: ${(props: Props) => (props.animate ? "visible" : "hidden")};
  margin-right: 0px;
`;

const hideCart = css`
  animation: ${slideOutAnimation} 1s forwards;
  visibility: ${(props: Props) => (props.animate ? "visible" : "hidden")};
`;

const CartStyles = styled.div`
  z-index: 6;
  position: relative;
  background: white;
  position: fixed;
  height: 100vh;
  top: 0;
  right: 0;
  width: 330px;
  min-width: 200px;
  visibility: hidden;

  .loading {
    position: absolute;
    top: 0;
    right: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 10;
    height: 100%;
    width: 100%;

    &::before {
      position: fixed;
      left: 50%;
      top: 50%;
      z-index: 2;

      content: "";
      display: none;
      width: 3em;
      height: 3em;

      border: 8px solid ${(props) => props.theme.black};
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-radius: 50%;
      opacity: 0.9;
    }
    &::after {
      position: fixed;
      left: 50%;
      top: 50%;
      z-index: 2;

      content: "";
      display: none;
      opacity: 0.9;
      width: 3em;
      height: 3em;

      border: 8px solid ${(props) => props.theme.white};
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-radius: 50%;
    }
    &[aria-busy="true"]::after {
      display: block;
      animation: ${loading} 1s linear infinite;
    }
    &[aria-busy="true"]::before {
      display: block;
      animation: ${loading} 1s linear infinite;
    }
  }

  p {
    font-size: 2rem;
  }

  ${(props: Props) => (props.open ? showCart : hideCart)};

  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 3;

  .cartTop {
    margin: 0;
    padding: 0;
    border-bottom: 5px solid ${(props) => props.theme.whiteGrey};
    text-align: left;
    padding-left: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    padding-top: 2rem;
    height: 10vh;
    .closeButton {
      background: black;
      color: white;
      font-size: 2rem;
      position: absolute;

      right: 0;
      top: 0;
      margin-top: 2rem;
      margin-right: 10px;
    }
  }

  .cartItems {
    position: relative;

    .emptyCart {
      text-align: center;
    }

    ul {
      margin: 0;
      padding: 5px 15px 15px 15px;

      height: 57vh;
      list-style: none;
      overflow-y: scroll;
    }
    .emptyCart {
      img {
        text-align: center;
        padding: 5px;
        width: 250px;
        height: 250px;
      }
    }
  }

  footer {
    position: relative;
    width: 100%;
    height: 30vh;
    bottom: 0;
    z-index: 5;
    background-color: white;
    -webkit-box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    align-items: center;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1.2fr 1.2fr 1.2fr 0.2fr;
    gap: 0px 0px;
    grid-template-areas:
      "total price"
      "button button"
      "button2 button2"
      "text text";
    padding: 20px;

    .total {
      p {
        font-size: 24px;
        color: ${(props) => props.theme.greyish};
        font-weight: bolder;
      }
      grid-area: total;
      align-self: start;
      justify-self: start;
    }
    .price {
      p {
        font-size: 24px;
        color: ${(props) => props.theme.greyish};
        font-weight: bolder;
      }

      grid-area: price;
      align-self: start;
      justify-self: end;
    }
    .button {
      grid-area: button;
      align-self: center;
      justify-self: center;
    }
    .button2 {
      grid-area: button2;
      align-self: center;
      justify-self: center;
    }
    p {
      color: ${(props) => props.theme.greyish};
      font-size: 12px;
    }

    .text {
      grid-area: text;
      align-self: center;
      justify-self: center;
    }
  }
`;

export default CartStyles;
