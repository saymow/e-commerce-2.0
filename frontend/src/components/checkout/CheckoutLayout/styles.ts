import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;

  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1rem;
  height: 80vh;
  overflow: hidden;
`;

export const ProductsContainer = styled.div`
  height: 100%;
  overflow: hidden;

  h1 {
    font-size: 3rem;
    text-transform: uppercase;
  }
`;

export const ProductList = styled.ul`
  margin: 1rem 0;
  padding: 1rem 0;

  height: 90%;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0.4rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--light-Grey);
    border-radius: 0.4rem;
  }
`;

export const InfoContainer = styled.main`
  height: 100%;

  h1 {
    font-size: 3rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
`;
