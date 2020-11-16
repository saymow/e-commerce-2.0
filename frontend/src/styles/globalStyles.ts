import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  ::root {
    font-size: 62.5%;
  }

  *, button, input {
    font-family: 'Pavanam', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;
