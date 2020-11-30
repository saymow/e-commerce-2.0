import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
`;

export const DoubleInputField = styled.div<{ invert?: boolean }>`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: ${({ invert }) => (!invert ? "3fr 1fr" : "1fr 3fr")};
`;

export const Form = styled.form`
  padding: 1rem;

  button {
    margin-top: 2rem;
  }
`;
