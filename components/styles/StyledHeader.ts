import styled from "styled-components";

export const StyledHeader = styled.header`
  z-index: 3;
  opacity: 1;

  .bar {
    border-bottom: 10px solid ${(props) => props.theme.black};
    display: grid;
    grid-template-columns: auto;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1ft auto;
    border-bottom: 1px solid ${(props) => props.theme.lightGrey};
  }
`;
