import { createGlobalStyle, css } from "styled-components";
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

    --box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.3);
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

export const ScrollStyles = css`
  ::-webkit-scrollbar {
    width: 0.4em;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--light-Grey);
    border-radius: 0.4em;
  }
`;
