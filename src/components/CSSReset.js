import { createGlobalStyle } from "styled-components";

export const CSSReset = createGlobalStyle`
  /* Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
  }
  /* NextJS */
  html {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  body {
    display: flex;
    flex: 1;
    background-color: ${({theme}) => theme.backgroundBase};
    color: ${({theme}) => theme.textColorBase};
  }
  #__next {
    display: flex;
    flex: 1;
  }
  /* Globals */
  button,
  a {
    text-decoration: none;
    opacity: 1;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
  }
    //Scrollbar Modification
  ::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track{
    background-color: rgba(80,80,80, 0.6);
  }
  ::-webkit-scrollbar-thumb{
    background-color: red;
    border-radius: 5px;
    
  }
  ::-webkit-scrollbar-thumb:hover{
    background-color: rgba(255,0,0, 0.6);
  }
`;