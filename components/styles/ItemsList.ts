import styled from "styled-components";

export const ItemsList = styled.div`
  padding-top: 20px;
  padding-right: 20px;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 20px;
  justify-content: center;
  align-content: center;
  @media (max-width: 870px) {
    grid-template-columns: 25vw 25vw;
  }
`;
