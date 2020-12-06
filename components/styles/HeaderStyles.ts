import styled from "styled-components";
interface Props {
  sticky: boolean;
  theme: {
    whiteBlack: string;
  };
}

export const HeaderStyles = styled.header`
  opacity: 1;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transition: 0.7s;

  ${(props: Props) =>
    props.sticky
      ? `padding: 15px 100px; background: #f3f3f4`
      : `padding: 30px 100px; background: transparent`};

  nav ul {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      position: relative;
      list-style: none;

      a {
        color: #fff;
        text-transform: uppercase;
        text-decoration: none;
        letter-spacing: 0.1em;
        display: inline-block;
        padding: 15px 15px;
        position: relative;

        ${(props: Props) => (props.sticky ? "color: black" : "color: white")};
      }

      a:hover::after {
        transform: scaleX(1) !important;
      }

      a:hover {
        color: ${(props: Props) => props.theme.darkerGrey};
      }
    }
  }

  .icon {
    color: white;
    cursor: pointer;

    ${(props: Props) => (props.sticky ? "color: black" : "color: white")};
  }

  .add:after {
    content: "";
    position: absolute;
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    height: 3px;
    bottom: 10px;
    left: 0;
    background-color: lightgrey;
    transform: scaleX(1);
    transform-origin: bottom right;
    transition: transform 0.3s;
  }

  .none:after {
    content: "";
    position: absolute;
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    height: 3px;
    bottom: 10px;
    left: 0;
    background-color: lightgrey;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s;
  }

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

    .add:after {
      width: 100%;
      margin-right: 0%;
      margin-left: 0%;
      bottom: -5px;
    }
  }
`;
