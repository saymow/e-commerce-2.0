import styled, { css } from "styled-components";
import { Plus } from "@styled-icons/boxicons-regular";

export const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;
`;

const iconsCSS = css`
  position: absolute;
  width: 2rem;
  height: 2rem;

  cursor: pointer;

  fill: var(--light-Grey);
`;

export const CreateAddress = styled.div`
  position: relative;
  min-height: 12rem;

  border: 1px solid var(--light-Grey);

  div {
    cursor: pointer;

    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    height: 9rem;
    width: 9rem;
    border-radius: 50%;

    background: var(--lighter-Grey);
  }
`;

export const PlusIcon = styled(Plus)`
  ${iconsCSS}
  top: 50%;
  left: 50%;

  height: 5rem;
  width: 5rem;

  transform: translate(-50%, -50%);
`;
