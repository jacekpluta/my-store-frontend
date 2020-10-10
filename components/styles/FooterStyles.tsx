import styled from "styled-components";

export const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 0.7fr 0.7fr 1.9fr;
  grid-template-rows: 0.8fr 0.1fr 0.1fr;

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

export const FooterLogos = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  border-top: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.greyish};
`;

export const FooterLogosImg = styled.img``;
