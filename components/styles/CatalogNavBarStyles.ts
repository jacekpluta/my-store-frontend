import styled from "styled-components";

export const CatalogNavBarStyles = styled.div`
  text-align: left;
  height: 100%;
  font-size: 14px;

  h2 {
    padding: 30px 0 0 25px;
  }
  .checkbox-container {
    padding: 10px 0 0 25px;
  }

  .checkbox-label {
    position: relative;
    margin: auto;
    cursor: pointer;
    font-size: 22px;
    line-height: 24px;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkbox-custom {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 24px;
    width: 24px;
    background-color: transparent;
    border-radius: 5px;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    border: 2px solid ${(props) => props.theme.black};
  }

  input:checked ~ .checkbox-custom {
    background-color: ${(props) => props.theme.black};
    border-radius: 5px;
    -webkit-transform: rotate(0deg) scale(1);
    -ms-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
    opacity: 1;
    border: 2px solid ${(props) => props.theme.black};
  }

  .checkbox-custom::after {
    position: absolute;
    content: "";
    left: 12px;
    top: 12px;
    height: 0px;
    width: 0px;
    border-radius: 5px;
    border: solid ${(props) => props.theme.black};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(0deg) scale(0);
    -ms-transform: rotate(0deg) scale(0);
    transform: rotate(0deg) scale(0);
    opacity: 1;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
  }

  input:checked ~ .checkbox-custom::after {
    -webkit-transform: rotate(45deg) scale(1);
    -ms-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
    opacity: 1;
    left: 8px;
    top: 3px;
    width: 6px;
    height: 12px;
    border: solid ${(props) => props.theme.white};
    border-width: 0 2px 2px 0;
    background-color: transparent;
    border-radius: 0;
  }

  /* For Ripple Effect */
  .checkbox-custom::before {
    position: absolute;
    content: "";
    left: 10px;
    top: 10px;
    width: 0px;
    height: 0px;
    border-radius: 5px;
    border: 2px solid ${(props) => props.theme.black};
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
  }
  input:checked ~ .checkbox-custom::before {
    left: -3px;
    top: -3px;
    width: 24px;
    height: 24px;
    border-radius: 5px;
    -webkit-transform: scale(3);
    -ms-transform: scale(3);
    transform: scale(3);
    opacity: 0;
    z-index: 999;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
  }
`;
