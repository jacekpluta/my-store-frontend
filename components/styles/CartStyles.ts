import styled, { keyframes, css } from "styled-components";

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
}

const showCart = css`
  animation: ${slideInAnimation} 1s forwards;
  visibility: visible;
  margin-right: 0px;
`;

const hideCart = css`
  animation: ${slideOutAnimation} 1s forwards;
  visibility: visible;
`;

const CartStyles = styled.div`
  z-index: 6;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 25%;
  min-width: 200px;
  visibility: hidden;

  ${(props: Props) => (props.open ? showCart : hideCart)};

  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 3;
  /* display: grid;
  grid-template-rows: auto 1fr auto; */
  img {
    padding: 10px;
    height: 50%;
    width: 100%;
  }

  p {
    font-size: 2rem;
  }
  .cartTop {
    margin: 0;
    padding: 0;
    border-bottom: 5px solid ${(props) => props.theme.whiteGrey};
    text-align: left;
    padding-left: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    padding-top: 2rem;

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

  footer {
    position: absolute;
    width: 100%;
    height: 30%;
    bottom: 0;

    -webkit-box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    align-items: center;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      "total price"
      "button button"
      "button2 button2";

    .total {
      grid-area: total;
    }
    .price {
      grid-area: price;
    }
    .button {
      grid-area: button;
      align-self: center;
    }
    .button2 {
      grid-area: button2;
      align-self: center;
      margin-left: 50%;
    }
  }
`;

export default CartStyles;
