import styled from "styled-components";

export const Container = styled.footer`
  background: var(--bg-Color);
  height: 15rem;
`;

export const Wrapper = styled.div`
  max-width: 1260px;
  width: 100%;
  padding: 1rem;

  margin: auto;

  display: flex;
  justify-content: space-between;
`;

export const Section = styled.section`
  width: 30%;

  h1 {
    line-height: 3rem;
    margin: 1rem 0;
    text-transform: uppercase;

    border-bottom: 1px solid var(--tertiary-Color);
  }
`;

export const ItemList = styled.ul`
  list-style: none;
`;

export const Item = styled.li`
  cursor: pointer;
  text-transform: uppercase;
  padding: 0.2rem 0;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const Input = styled.input`
  font-size: 1.175rem;
  padding: 0.8rem 1rem;

  border: 1px solid #ccc;
`;

export const Button = styled.button`
  font-size: 1.2rem;

  cursor: pointer;
  padding: 0.8125rem;
  border: 0;

  background: var(--tertiary-Color);
  color: var(--bg-Color);
`;
