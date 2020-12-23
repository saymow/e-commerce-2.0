import styled from "styled-components";
import { ScrollStyles } from "../../../styles/globalStyles";

interface ContainerProsp {
  contentSize: "small" | "large";
}

interface CartProps {
  cartSize: "small" | "large";
}

export const Container = styled.div<ContainerProsp>`
  padding: 1rem;

  display: grid;
  grid-template-columns: ${({ contentSize }) =>
    contentSize === "small" ? "3fr 2fr" : "2fr 3fr"};
  grid-gap: 1rem;
  height: 80vh;
  overflow: hidden;
`;

export const CartContainer = styled.div<CartProps>`
  height: 100%;
  overflow: hidden;

  font-size: ${({ cartSize }) => (cartSize === "small" ? ".7rem" : "1rem")};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-size: 3rem;
    text-transform: uppercase;
  }
`;

export const CartTotal = styled.article`
  width: 100%;
  padding-top: 0.5em;

  border-top: 1px solid var(--light-Grey);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CartTotalItem = styled.span<{ highlight?: boolean }>`
  display: flex;
  justify-content: space-between;

  text-transform: uppercase;
  padding: 1em;
  border: 1px solid var(--lighter-Grey);
  font-size: 1.2em;

  background: ${({ highlight }) =>
    highlight ? "var(--light-Grey)" : "inherit"};

  strong {
    margin-right: 0.5em;
  }

  p,
  p strong {
    color: ${({ highlight }) => (highlight ? "var(--bg-Color)" : "inherit")};
  }
`;

export const ProductList = styled.ul`
  position: relative;
  margin: 1em 0 0.5em 0;

  height: 100%;
  overflow: auto;

  ${ScrollStyles}
`;

export const ContentContainer = styled.main<{ overflow: string }>`
  height: 100%;

  overflow: ${({ overflow }) => overflow};

  ${ScrollStyles}

  h1 {
    font-size: 3rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  > div {
    height: 100%;
  }
`;
