import styled from "styled-components";

export const SingleItemStyle = styled.div`
  margin: 1rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  min-height: auto;
  max-width: 1300px;
  padding: 30px;
  margin-top: 150px;
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
    margin-left: 2rem;
    font-size: 2rem;
    font-weight: 500;
    padding-right: 15%;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;

    img {
      padding-bottom: 30px;
    }

    .details {
      padding-right: 0%;
    }
  }
`;

export const CounterStyles = styled.div`
  position: relative;
`;

export const AdminButtonsContainer = styled.div``;
