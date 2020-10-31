import styled from "styled-components";

export const SingleItemStyle = styled.div`
  margin: 1rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  min-height: 600px;
  max-width: 1300px;
  padding: 30px;

  img {
    width: 100%;
    height: 100%;
  }

  h2 {
    font-size: 2.6rem;
    font-weight: 900;
  }

  p {
    margin: 0;
    padding: 0;
  }

  span {
    display: flex;
  }

  span .genderBox {
    border-style: solid;
    padding: 6px;
    padding-left: 12px;
    padding-right: 12px;
    margin-top: -7px;
    color: white;
    background-color: ${(props) => props.theme.black};
  }

  span p:nth-child(1) {
    font-weight: 550;
  }

  p:nth-child(3) {
    padding-top: 20px;
  }

  .details {
    margin-left: 3rem;
    font-size: 2rem;
    font-weight: 500;
    padding-right: 15%;
  }
`;

export const CounterStyles = styled.div`
  position: relative;
  margin-right: 100px;
`;

export const AdminButtonsContainer = styled.div``;
