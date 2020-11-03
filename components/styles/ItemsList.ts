import styled from "styled-components";

export const ItemsList = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: 23vw 23vw 23vw;
  grid-gap: 20px;


   @media (max-width: 870px) {
grid-template-columns: 25vw 25vw;
  }
`;
