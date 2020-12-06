import styled, { css } from "styled-components";

interface Props {
  activeTab: String;
}

const aaa = css`
  display: block;
  animation: 1s forwards;
`;

export const AccountPageStyles = styled.div`
  text-align: left;
  background-color: ${(props) => props.theme.white};
  width: 100%;
  height: auto;
  padding: 50px;
  display: grid;
  grid-template-columns: 0.4fr 1.6fr;
  justify-content: center;

  .menu {
    padding-left: 40px;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        font-size: 16px;
        font-weight: 900;
        padding: 10px;
        margin-right: 15%;

        :hover {
          background-color: ${(props) => props.theme.offWhite};
        }
      }
    }
  }

  .details {
    margin-right: 10%;
    background-color: ${(props) => props.theme.offWhite};
    -webkit-box-shadow: 0 0 20px -11px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0 0 20px -11px rgba(0, 0, 0, 0.75);
    box-shadow: 0 0 20px -11px rgba(0, 0, 0, 0.75);
    h2 {
      font-size: 28px;
      padding-top: 50px;
      padding-left: 50px;
    }
  }
`;

export const AccountPageTitle = styled.h1`
  font-size: 40px;
  padding-left: 100px;
  padding-top: 50px;
`;
