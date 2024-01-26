import styled from "styled-components";
import { ScrollStyles } from "../../../styles/globalStyles";

export const Container = styled.div`
  height: 100%;
  display: flex;
`;

export const PaymentDetails = styled.section`
  flex: 1;

  h2 {
    font-size: 2rem;
    text-transform: uppercase;
  }

  display: flex;
  flex-direction: column;

  padding-right: 1rem;
`;

export const PaymentMethods = styled.section`
  padding: 0.5rem;

  width: max(40%, 10rem);

  h2 {
    font-size: 2rem;
    text-transform: uppercase;
  }
`;

export const Method = styled.article`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--lighter-Grey);

  max-height: 40vh;
  overflow: auto;
  ${ScrollStyles}
`;
