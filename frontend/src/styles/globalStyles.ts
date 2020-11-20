import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./theme";

export default createGlobalStyle<{ theme: ThemeType }>`
  :root {
    font-size: 90%;
    --bg-Color: ${({ theme }) => theme.bgColor};
    --secondary-bg-Color: ${({ theme }) => theme.secondaryBgColor};
    --light-Grey: ${({ theme }) => theme.lightGrey};
    --lighter-Grey: ${({ theme }) => theme.lighterGrey};
    --primary-Color: ${({ theme }) => theme.primaryColor};
    --secondary-Color: ${({ theme }) => theme.secondaryColor};
    --tertiary-Color: ${({ theme }) => theme.tertiaryColor};
  }

  body {
    background-color: ${({ theme }) => theme.secondaryBgColor};
  }

  * {
    color: ${({ theme }) => theme.primaryColor};
  }

  input {
    color: #000;
  }

  *, button, input {
    font-family: 'Pavanam', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;
