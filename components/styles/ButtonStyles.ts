import styled from "styled-components";

export const ButtonMainNormal = styled.button`
  padding: 10px 20px;
  font-size: 0.5em;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  background-color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.black};
  box-shadow: 0 4px rgba(0, 0, 0, 0.2);
  position: relative;
  display: inline-block;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.black};
  }

  &:before {
    position: absolute;
    content: "";
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;

    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
      inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const ButtonMainParalax = styled(ButtonMainNormal)`
  padding: 20px 46px;
  font-size: 1em;

  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.white};

  border-radius: 50px;
  /* top: 65%; */
  &:hover {
    background-color: ${(props) => props.theme.black};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.black};
  }
`;

export const ButtonMainShiny = styled(ButtonMainNormal)`
  padding: 20px 46px;
  border-radius: 50px;

  &:before {
    animation: shiny-btn1 3s ease-in-out infinite;
  }

  @keyframes shiny-btn1 {
    0% {
      -webkit-transform: scale(0) rotate(45deg);
      opacity: 0;
    }
    80% {
      -webkit-transform: scale(0) rotate(45deg);
      opacity: 0.5;
    }
    81% {
      -webkit-transform: scale(4) rotate(45deg);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(50) rotate(45deg);
      opacity: 0;
    }
  }
`;

export const ButtonCatalogNavFilter = styled(ButtonMainNormal)`
  font-size: 1em;
  padding: 15px 15px;
  border-radius: 10px;
  margin-top: 25px;
`;

export const ButtonCatalogNavClear = styled(ButtonMainNormal)`
  font-size: 1em;
  padding: 15px 15px;
  margin-left: 5px;
  border-radius: 10px;
`;

export const ButtonContinue = styled(ButtonMainNormal)`
  text-align: center;
  font-size: 1em;
  padding: 15px 55px;
  width: 80%;
  margin-left: 10%;
`;

export const ButtonPickSize = styled(ButtonMainNormal)`
  font-size: 1em;
  padding: 15px;
  border-radius: 10px;
  margin-top: 25px;
  margin-right: 15px;
  margin-left: 15px;
`;

export const ButtonCounterFirst = styled(ButtonMainNormal)`
  font-size: 1.3em;
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  margin-top: 100px;
  margin-right: 0px;
  margin-left: 0px;
  border: 1px solid ${(props) => props.theme.blackwhite};
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};

  &:hover {
    background-color: ${(props) => props.theme.black};
    color: ${(props) => props.theme.white};
  }
`;

export const ButtonCounterSecond = styled(ButtonCounterFirst)`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

export const ButtonCounterNumber = styled(ButtonCounterFirst)`
  border-radius: 0;
  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.black};
  }
`;

export const ButtonAddToCart = styled(ButtonMainNormal)`
  border-radius: 10px;
  font-size: 0.8em;
  padding: 15px;
  margin-top: 20px;
  padding-right: 100px;
  padding-left: 100px;
`;
