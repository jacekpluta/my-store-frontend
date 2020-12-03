import { createGlobalStyle } from "styled-components";
import { isCartOpen } from "../../lib/vars";
import { theme } from "./Theme";

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  font-size: 10px;
 
}

*, *:before, *:after{
  box-sizing: inherit
}

:focus {
    outline: none;
}

body{
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  line-height: 2;
  overflow: ${isCartOpen() ? "hidden" : "scroll"};
}
  a{
    color: ${theme.black};
  }
`;
