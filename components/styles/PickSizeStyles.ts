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
  showPickSize: Boolean;
}

export const PickSizeStyles = styled.div`
  position: fixed;
  width: 25vw;
  height: 30vw;
  display: none;
  position: fixed;
  top: 20%;
  left: 40%;
  opacity: 0;
  z-index: 5;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;

  ${(props: Props) =>
    props.showPickSize ? pickSizeSlideIn : pickSizeSlideOut};

  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};

  img {
    padding-top: 20px;
    padding-left: 20px;
    width: 160px;
    height: 180px;
  }

  .description {
    display: flex;
    justify-content: space-between;

    span {
      font-weight: 500;
      font-size: 1.7rem;
      padding-top: 80px;
      padding-right: 50px;

      p {
        padding: 0;
        margin: 0;
      }

      p:nth-child(2) {
        color: ${(props) => props.theme.greyish};
      }
    }
  }

  .pickSizeButtons {
    margin-top: 5px;
    display: flex;
    margin-left: 29px;
  }
`;
