import styled from "styled-components";

const ButtonStyles = styled.button`
  cursor: pointer;

  &.outline {
    position: relative;
    z-index: 3;
    background: transparent;
    color: #1172c4;
    font-size: 14px;
    border-color: #1172c4;
    border-style: solid;
    border-width: 2px;
    border-radius: 22px;
    padding: 10px 40px;
    text-transform: uppercase;
    transition: all 0.2s linear;
    font-weight: 700;
    color: #00aeef;
    border-color: white;
    background: white;
    a {
      text-decoration: none;
    }
  }
  &:hover {
    color: white;
    background: #1172c4;
    border-color: white;
    transition: all 0.2s linear;
    color: white;
    background: #00aeef;
    border-color: white;
  }
  &:active {
    border-radius: 22px;
  }
`;

export default ButtonStyles;
