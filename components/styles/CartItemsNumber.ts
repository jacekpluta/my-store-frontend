import styled from "styled-components";

const CartItemsNumber = styled.div`
  display: inline;
  font-size: 1.2rem;
  position: absolute;
  top: -12px;
  right: -6px;
  background: ${(props) => props.theme.whiteGrey};
  border-radius: 0.8em;
  -moz-border-radius: 0.8em;
  -webkit-border-radius: 0.8em;
  color: ${(props) => props.theme.black};
  font-weight: bold;
  line-height: 1.2em;

  padding-top: 4px;
  text-align: center;
  width: 1.6em;
  height: 1.6em;
  cursor: pointer;

  @media (max-width: 1000px) {
    right: 65px;
  }
`;

export default CartItemsNumber;
