import styled from "styled-components";
import { Trash, Plus, Minus } from "@styled-icons/boxicons-regular";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductList = styled.ul`
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.4rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #000;
    border-radius: 0.4rem;
  }
`;

export const Information = styled.div`
  border-top: 1px solid #ccc;
`;

export const Details = styled.div`
  padding: 0.5rem 0;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0.3rem;

    &:last-child {
      border-top: 1px solid #ccc;
    }

    p,
    strong {
      text-transform: uppercase;
    }

    strong {
      padding-top: 0.3rem;
    }
  }
`;

export const Product = styled.li`
  position: relative;

  display: grid;
  grid-template-columns: 1fr 2fr;

  padding: 0.5rem;
  margin: 0.5rem 0;

  > div {
    padding: 1rem;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`;

export const ProductImage = styled.div``;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductName = styled.h2``;

export const ProductPrice = styled.strong``;

export const QtyContainer = styled.div`
  display: flex;
  align-items: center;

  button {
    padding: 0;
    background: transparent;
    border: 0;
  }

  input {
    text-align: center;
    width: 1.4rem;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const MinusIcon = styled(Minus)`
  width: 1.3rem;
  height: 1.3rem;

  cursor: pointer;
`;

export const PlusIcon = styled(Plus)`
  width: 1.3rem;
  height: 1.3rem;

  cursor: pointer;
`;

export const RemoveProductIcon = styled(Trash)`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;

  cursor: pointer;

  width: 2rem;
  height: 2rem;
  fill: #ccc;
`;
