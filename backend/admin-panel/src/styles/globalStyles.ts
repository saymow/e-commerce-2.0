import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    /* font-size: 62.5%; */
    font-family: 'Space Grotesk', sans-serif;
  }

  *, button, input {
    font-family: 'Space Grotesk', sans-serif;
    border: 0;
  }
`;
