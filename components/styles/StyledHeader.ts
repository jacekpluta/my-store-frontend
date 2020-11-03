import styled from "styled-components";

export const StyledHeader = styled.header`
  z-index: 3;
  opacity: 1;
  z-index: 10;

  img {
    object-fit: cover;
    width: 150px;
    height: 80px;
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    .logo {
    
  margin-left: calc(50% - 75px);
    
    
    }
  }
`;
