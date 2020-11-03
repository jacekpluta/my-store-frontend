import styled, { css, keyframes } from "styled-components";

interface Props {
  toggleBar: Boolean;
  navOpen: Boolean;
  main: Boolean;
  theme: {
    white: String;
    black: String;
  };
}

const NavMenu = styled.ul`
  position: absolute;
  z-index: 11;

  @media (min-width: 1000px) {
    display: none;
  }

  @media (max-width: 1000px) {
    #menuToggle {
      display: block;
      position: fixed;
      left: 45px;
      top: 35px;
      z-index: 5;
      -webkit-user-select: none;
      user-select: none;
    }

    #menuToggle h1 {
      color: black;
    }

    #menuToggle a {
      text-decoration: none;
      color: #232323;
      transition: color 0.3s ease;
    }

    #menuToggle a:hover {
      color: ${(props) => props.theme.black};
    }

    #menuToggle input {
      display: block;
      width: 40px;
      height: 32px;
      position: absolute;
      top: -7px;
      cursor: pointer;
      opacity: 0;
      z-index: 2;
      -webkit-touch-callout: none;
      left: ${(props: Props) => (props.navOpen ? "210px" : "0px")};
    }

    #menuToggle span {
      display: block;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;
      background: ${(props: Props) =>
        !props.toggleBar && props.main
          ? "#20211D"
          : !props.main
          ? "#20211D"
          : "#FFFFFF"};

      border-radius: 3px;
      z-index: 1;
      transform-origin: 4px 0px;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
    }

    #menuToggle span:first-child {
      transform-origin: 0% 0%;
    }

    #menuToggle span:nth-last-child(2) {
      transform-origin: 0% 100%;
    }

    #menuToggle input:checked ~ span {
      opacity: 1;
      transform: rotate(45deg) translate(151px, -149px);
      background: #232323;

      /* ${(props: Props) =>
        props.navOpen
          ? " opacity: 1; transform: rotate(45deg) translate(151px, -149px); background: #232323;"
          : " opacity: 1; transform: rotate(45deg) translate(151px, -149px); background: #232323;"} */
    }

    #menuToggle input:checked ~ span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }

    #menuToggle input:checked ~ span:nth-last-child(2) {
      transform: rotate(-45deg) translate(149px, 152px);
    }

    #menu {
      position: absolute;
      width: 300px;
      margin: -100px 0 0 -50px;
      padding: 50px;

      background: ${(props) => props.theme.white};
      list-style-type: none;
      -webkit-font-smoothing: antialiased;
      transform-origin: 0% 0%;
      transform: translate(-100%, 0);
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
      height: calc(100vh + 100px);

      h1 {
        font-size: 24px;
        position: relative;
        left: -20px;
        padding-top: 23px;
        padding-bottom: 15px;
      }
      .barTop {
        position: relative;
        width: 300px;
        border-bottom: solid thin;
        left: -50px;
      }
      .footer {
        ul {
          display: flex;

          list-style: none;
        }
        position: absolute;
        width: 300px;
        border-top: ${(props) => props.theme.whiteGrey} solid thin;
        height: 20px;
        bottom: 120px;
        left: 0px;
        border-bottom: none;
        li {
          position: relative;
          left: 0px;

          border-bottom: none;

          a {
            font-size: 20px;
            position: relative;
            left: 0;
          }
        }
      }
      li {
        position: relative;
        left: -50px;
        width: 300px;
        border-bottom: solid thin ${(props) => props.theme.whiteGrey};

        a {
          font-size: 18px;
          position: relative;
          left: 30px;
        }
      }
    }

    #menu li {
      padding: 10px 0;
      font-size: 22px;
    }

    #menuToggle input:checked ~ ul {
      transform: none;
    }
  }
`;

export default NavMenu;
