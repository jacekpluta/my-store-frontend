import styled from "styled-components";

export const Sort = styled.div`
  border: solid 1px ${(props) => props.theme.whiteGrey};

  ul {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 150px;
    font-weight: normal;
  }

  ul > li {
    position: relative;
    float: left;
    margin-right: 10px;
  }
  ul > li > a {
    display: block;
    padding: 8px 14px;
    text-decoration: none;
  }
  ul > li > a:hover {
    background-color: #666666;
    color: #eeeeee;
  }
  ul li span a {
    display: flex;
    width: 150px;
    justify-content: space-between;
  }
  ul ul {
    position: absolute;
    z-index: 100;
    text-align: left;
    height: 0;
    /* !!!!!!!!!!! */
    top: 35px;
    width: 102%;
    left: -1%;
    overflow: hidden;

    -webkit-transition: height 0.3s ease-in;
    -moz-transition: height 0.3s ease-in;
    -o-transition: height 0.3s ease-in;
    -ms-transition: height 0.3s ease-in;
    transition: height 0.3s ease-in;
  }

  ul > li:hover ul,
  ul > li > a:hover ul,
  ul ul li:hover > ul,
  ul ul li a:hover > ul {
    height: 220px;
  }

  /* div:focus {
  outline: none;
} */

  ul ul li {
    background-color: #eaeaea;
    width: 160px;

    -webkit-transition: background-color 0.3s ease;
    -moz-transition: background-color 0.3s ease;
    -o-transition: background-color 0.3s ease;
    -ms-transition: background-color 0.3s ease;
    transition: background-color 0.3s ease;
  }

  ul ul li:hover {
    background-color: #999;
  }

  ul ul li a {
    display: block;
    overflow: hidden;
    text-decoration: none;
    margin: 0 12px;
    padding: 5px 0;
    color: #4c4c4c;
  }
  ul ul li a:hover,
  ul ul li:hover > a {
    color: #ffffff;
  }

  ul ul ul li a {
    border: 0 !important;
  }
  ul ul ul li + li a {
    border-top: 1px dotted #999 !important;
  }
  ul ul li + li a {
    border-top: 1px dotted #999;
  }
  ul ul li:hover + li a {
    border-top: 1px solid #eaeaea;
  }
  ul ul ul li:hover + li a {
    border: 0 !important;
  }
  ul ul ul li:hover + li {
    border-top: 1px solid #999 !important;
  }
`;

export const SortStyles = styled(Sort)`
  position: absolute;
  padding-top: 5px;
  padding-bottom: 5px;
  right: 0;
  margin-right: 40px;
`;

export const SortStylesSigleItem = styled(Sort)`
  position: absolute;
  margin-top: 30px;
`;
