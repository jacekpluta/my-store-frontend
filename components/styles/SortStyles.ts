import styled from "styled-components";

export const SortStyles = styled.div`
  width: 100%;
  padding-right: 100px;
  padding-left: 14px;
  padding-top: 10px;

  /* border-color: ${(props) => props.theme.lightGrey}; */
  ul {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;

    /* font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; */
    font-weight: normal;
  }

  ul > li {
    position: relative;
    float: left;
    margin-right: 10px;
  }
  ul > li > a {
    display: block;
    /* background-color: #2c2c2c; */
    padding: 8px 14px;
    text-decoration: none;
    /* color: #aaaaaa; */
  }
  ul > li > a:hover {
    background-color: #666666;
    color: #eeeeee;
  }
  ul ul {
    width: 340px;

    position: absolute;
    z-index: 100;

    height: 0;
    overflow: hidden;

    -webkit-transition: height 0.3s ease-in;
    -moz-transition: height 0.3s ease-in;
    -o-transition: height 0.3s ease-in;
    -ms-transition: height 0.3s ease-in;
    transition: height 0.3s ease-in;
  }

  /* don't display tertiary box yet */
  ul > li:hover ul ul,
  ul > li > a:hover ul ul {
    height: 0;
  }
  /* tertiary drop-down box */
  ul ul ul {
    left: 170px;
    width: 170px;
  }

  ul > li:hover ul,
  ul > li > a:hover ul,
  ul ul li:hover > ul,
  ul ul li a:hover > ul {
    height: 220px;
  }

  ul ul li {
    background-color: #eaeaea;
    width: 170px;

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
