import styled from "styled-components";
import { Trash, Plus, Minus } from "@styled-icons/boxicons-regular";

export const Container = styled.li`
  list-style: none;

  position: relative;
  display: flex;

  margin: 1rem 0;
  padding: 2rem 0;

  &:not(:first-child) {
    border-top: 1px solid var(--lighter-Grey);
  }
`;

export const Info = styled.main`
  margin-left: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Name = styled.h2`
  font-size: 2.6rem;
`;

export const Price = styled.span`
  font-size: 2rem;
`;

export const TrashIcon = styled(Trash)`
  position: absolute;
  top: 2rem;
  right: 2rem;

  cursor: pointer;

  width: 2rem;
  height: 2rem;
  fill: var(--lighter-Grey);
`;

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
  width: 2rem;
  height: 2rem;

  cursor: pointer;
`;

export const PlusIcon = styled(Plus)`
  width: 2rem;
  height: 2rem;

  cursor: pointer;
`;
