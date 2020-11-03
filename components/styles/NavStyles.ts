import styled from "styled-components";

const NavStyles = styled.ul`
  margin-left: auto;

  @media (min-width: 1000px) {
    nav ul li a {
      font-size: 20px;
    }

    .icons {
      display: none;
    }
  }

  @media (max-width: 1000px) {
    nav ul {
      display: none;
    }

    .icons {
      li {
        padding-right: 10px;
      }
      display: flex;
      list-style: none;
      position: absolute;
      top: 30px;
      right: 5px;
    }
  }
`;

export default NavStyles;
