import styled from "styled-components";
import { ScrollStyles } from "../../../../styles/globalStyles";

export const Container = styled.div`
  height: 90%;
  overflow-y: auto;

  ${ScrollStyles}

  padding: 0 0.5rem;
`;

export const Form = styled.form`
  button {
    margin-top: 2rem;
  }
`;

export const DoubleInputField = styled.div<{ invert?: boolean }>`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: ${({ invert }) => (!invert ? "3fr 1fr" : "1fr 3fr")};
`;
