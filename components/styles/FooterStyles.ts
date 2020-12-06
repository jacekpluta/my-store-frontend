import styled from "styled-components";

export const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.8fr 0.1fr 0.1fr;
  grid-gap: 20px;

  ul {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul > li {
    position: relative;
    margin-right: 10px;
  }

  ul:nth-child(4) > li {
    float: right;
  }

  ul:nth-child(1) > li > a {
    color: ${(props) => props.theme.greyish};
  }
  ul:nth-child(1) > li:nth-child(1) > a {
    color: ${(props) => props.theme.white};
    font-weight: 900;
  }
  ul:nth-child(2) > li > a {
    color: ${(props) => props.theme.greyish};
  }
  ul:nth-child(2) > li:nth-child(1) > a {
    color: ${(props) => props.theme.white};
    font-weight: 900;
  }

  ul:nth-child(3) > li > a {
    color: ${(props) => props.theme.greyish};
  }
  ul:nth-child(3) > li:nth-child(1) > a {
    color: ${(props) => props.theme.white};
    font-weight: 900;
  }

  ul > li > a {
    cursor: pointer;
    text-decoration: none;
    color: ${(props) => props.theme.white};
  }

  ul > li > a:hover {
    color: #eeeeee;
  }

  @media (max-width: 730px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.8fr 0.1fr 0.1fr;

    ul:nth-child(4) > li {
      float: left;
    }
  }
`;

export const Bar = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  border-top: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.greyish};
`;

export const Credits = styled.div`
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: flex-end;
  }

  a {
    color: ${(props) => props.theme.greyish};
    font-size: 11px;
    line-height: 1;
    margin: 0;
    padding: 0;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  ul > li {
    font-size: 11px;
    line-height: 1;
    margin: 0;
    padding: 0;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  ul > li > a {
    cursor: pointer;
  }

  ul > li > a {
    margin-right: 10px;
  }

  ul > li > a:hover {
    color: #eeeeee;
  }
`;

export const FooterStyles = styled.footer`
  background-color: ${(props) => props.theme.black};
  height: 100%;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 3%;
`;

export const Logos = styled.div`
  border-top: 1px solid ${(props) => props.theme.whiteGrey};
  padding-top: 3%;
  height: 170px;
`;

export const LogosImg = styled.img`
  height: 90px;
  margin-right: 30px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  opacity: 0.7;
`;
