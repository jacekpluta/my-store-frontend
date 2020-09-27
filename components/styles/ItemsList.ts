import styled from "styled-components";

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;

  padding-right: 30px;
  /* max-width: ${(props) => props.theme.max}; */
`;
