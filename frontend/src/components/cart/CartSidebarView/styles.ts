import styled from "styled-components";

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
