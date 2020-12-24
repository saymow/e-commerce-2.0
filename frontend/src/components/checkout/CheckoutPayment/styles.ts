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

export const DetailsSection = styled.article`
  display: flex;
  flex-direction: column;

  h3 {
    text-transform: uppercase;
    font-size: 1.4rem;
    text-align: center;
    line-height: 2.2rem;
  }

  border: 1px solid var(--lighter-Grey);

  margin: 1rem 0;
  padding: 1rem;
`;

export const DetailsField = styled.div`
  display: flex;
  align-items: center;

  strong {
    text-transform: uppercase;
    margin-right: 0.5rem;
  }

  strong,
  p {
    font-size: 1.2rem;
  }
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

  max-height: 30vh;
  overflow: auto;
  ${ScrollStyles}
`;
