import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  *{
    box-sizing:border-box;
    font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';
    color:#000;
  };
  
  a {
    cursor: pointer; text-decoration: none;
  }

  h1,h2,h3,h4,h5,h6,p,li,ul,ol{
    margin: 0px;
    padding: 0px;
  }
`;
