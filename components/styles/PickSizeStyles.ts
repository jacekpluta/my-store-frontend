import styled, { css, keyframes } from "styled-components";

const slideInAnimation = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;
const slideOutAnimation = keyframes`
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-100%);
  }
`;

const pickSizeSlideIn = css`
  display: block;
  animation: ${slideInAnimation} 1s forwards;
`;

const pickSizeSlideOut = css`
  display: block;
  animation: ${slideOutAnimation} 1s forwards;
`;

interface Props {
  showPickSize: boolean;
}

export const PickSizeStyles = styled.div`
  width: 25vw;
  height: 30vw;
  display: none;
  position: fixed;
  top: 25%;
  left: 40%;
  opacity: 0;
  z-index: 5;
  display: grid;
  grid-template-rows: 1fr auto auto auto;
  grid-template-columns: 1fr 1fr;

  ${(props: Props) =>
    props.showPickSize ? pickSizeSlideIn : pickSizeSlideOut};

  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};
`;
