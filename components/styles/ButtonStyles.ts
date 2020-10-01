import styled from "styled-components";

export const ButtonMainShiny = styled.button`
  padding: 20px 46px;
  font-size: 0.5em;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  background-color: black;
  border-radius: 50px;
  border: 1px solid black;
  position: relative;
  display: inline-block;
  overflow: hidden;
  box-shadow: 0 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
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
    animation: shiny-btn1 3s ease-in-out infinite;

    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
      inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
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

export const ButtonMainNormal = styled.button`
  padding: 10px 20px;
  font-size: 0.5em;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  background-color: black;
  border: 1px solid black;
  box-shadow: 0 4px rgba(0, 0, 0, 0.2);
  position: relative;
  display: inline-block;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
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

export const ButtonMainParalax = styled.button`
  padding: 25px 50px;
  font-size: 1em;
  text-transform: uppercase;
  cursor: pointer;
  color: blacl;
  background-color: white;
  border: 1px solid white;
  box-shadow: 0 4px rgba(0, 0, 0, 0.2);
  position: relative;
  display: inline-block;
  overflow: hidden;
  transition: all 0.3s ease;
  border-radius: 50px;
  top: 65%;
  &:hover {
    background-color: black;
    color: white;
    border: 1px solid black;
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
