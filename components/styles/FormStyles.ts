import styled, { keyframes } from "styled-components";

const loading = keyframes`

  from{transform:rotate(360deg)} 
  to{transform:rotate(0deg) }
`;

export const FormStyles = styled.div`
  .veen {
    width: 70%;
    margin: 100px auto;
    background: rgba(255, 255, 255, 0.5);
    min-height: 400px;
    display: table;
    position: relative;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);

    .splits p {
      font-size: 18px;
    }

    button {
      background: transparent;
      background-image: linear-gradient(
        90deg,
        ${(props) => props.theme.black},
        ${(props) => props.theme.black}
      );
      display: inline-block;
      padding: 10px 30px;
      border: 3px solid #fff;
      border-radius: 50px;
      background-clip: padding-box;
      position: relative;
      color: #fff;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
      transition: all 0.25s;

      button:active {
        box-shadow: none;
      }

      button:focus {
        outline: none;
      }
    }
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
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
  .veen > div {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: #fff;
  }

  .veen button.dark {
    border-color: ${(props) => props.theme.white};
    background: ${(props) => props.theme.lightBlack};
  }

  .veen .move button.dark {
    border-color: ${(props) => props.theme.white};
    background: ${(props) => props.theme.black};
  }

  .veen > .wrapper {
    position: absolute;
    width: 40%;
    height: 120%;
    top: -10%;
    left: 10%;
    background: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
    transition: all 0.5s;
    color: #303030;
    overflow: hidden;
  }
  .veen .wrapper > form {

    padding: 34px 30px 30px;
    width: 100%;
    transition: all 0.5s;
    background: #fff;

  }
  .veen .wrapper > form:focus {
    outline: none;
  }
  .veen .wrapper .login {
    visibility: visible;
  }
  .veen .wrapper .register {
    margin-top: 20px;
    transform: translateY(-100%) translateX(100%);
    visibility: hidden;
  }
  .veen .wrapper.move .register {
    transform: translateY(-100%) translateX(0%);
    visibility: visible;
  }
  .veen .wrapper.move .login {
    transform: translateX(-100%);
    visibility: hidden;
  }
  .veen .wrapper > form > div {
    position: relative;
    margin-bottom: 15px;
  }
  .veen .wrapper label {
    position: absolute;
    top: -7px;
    font-size: 12px;
    white-space: nowrap;
    background: #fff;
    text-align: left;
    left: 15px;
    padding: 0 5px;
    color: #999;
    pointer-events: none;
  }

  .veen .wrapper input,
  select {
    height: 40px;
    padding: 5px 15px;
    width: 100%;
    border: solid 1px #999;
  }

  .veen .wrapper input:focus {
    outline: none;
    border-color: #ff4931;
  }
  .veen > .wrapper.move {
    left: 45%;
  }
  .veen > .wrapper.move input:focus {
    border-color: #e0b722;
  }
  @ (max-width: 767px) {
    .veen {
      padding: 5px;
      margin: 0;
      width: 100%;
      display: block;
    }
    .veen > .wrapper {
      position: relative;
      height: auto;
      top: 0;
      left: 0;
      width: 100%;
    }
    .veen > div {
      display: inline-block;
    }
    .splits {
      width: 50%;
      background: #fff;
      float: left;
    }
    .splits button {
      width: 100%;
      border-radius: 0;
      background: ${(props) => props.theme.black};
      border: 0;
      opacity: 1;
    }
    .splits button.active {
      opacity: 1;
    }
    .splits button.active {
      opacity: 0.8;
      background: ${(props) => props.theme.lightBlack};
    }
    .splits.rgstr-btn button.active {
      background: ${(props) => props.theme.lightBlack};
    }
    .splits p {
      display: none;
    }
    .veen > .wrapper.move {
      left: 0%;
    }
  }

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    box-shadow: inset 0 0 0 50px #fff;
  }

  /* ----------------- */
  h2.second {
    font-weight: 400;
  }

  h2.second span {
    position: relative;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 10px;
    border-bottom: 1px solid mediumseagreen;
  }

  h2.second span:after {
    content: "";
    position: absolute;
    bottom: calc(-100% - 1px);
    margin-left: -10px;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border-top: 1px solid mediumseagreen;
  }

  .site-link {
    padding: 5px 15px;
    position: fixed;
    z-index: 2;
    background: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
    right: 30px;
    bottom: 30px;
    border-radius: 10px;
  }

  .site-link img {
    width: 30px;
    height: 30px;
  }
`;
