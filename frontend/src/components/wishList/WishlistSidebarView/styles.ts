import styled from "styled-components";
import { HeartDislike } from "@styled-icons/ionicons-outline";
import { ScrollStyles } from "../../../styles/globalStyles";

export const Container = styled.ul`
  display: flex;
  flex-direction: column;

  height: 100%;
  overflow-y: scroll;

  ${ScrollStyles}
`;

export const Item = styled.li`
  position: relative;

  display: grid;
  grid-template-columns: 1fr 2fr;

  padding: 0.5rem;
  margin: 0.5rem 0;

  div {
    padding: 1rem;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--lighter-Grey);
  }

  transition: background 200ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);

    > svg:first-child {
      display: block;
    }
  }
`;

export const Name = styled.h2``;

export const Price = styled.span`
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  font-weight: bold;
`;

export const UnwishlistIcon = styled(HeartDislike)`
  display: none;
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  cursor: pointer;

  width: 4rem;
  height: 4rem;

  fill: var(--secondary-Color);
`;
