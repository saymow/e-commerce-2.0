import styled, { css } from "styled-components";
import { Trash, Plus } from "@styled-icons/boxicons-regular";
import { Edit } from "@styled-icons/boxicons-regular";

export const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
`;

export const Address = styled.article`
  position: relative;

  margin: 0.5rem;
  padding: 2rem;
  border: 1px solid var(--light-Grey);
`;

export const InfoLine = styled.p``;

const iconsCSS = css`
  position: absolute;
  width: 2rem;
  height: 2rem;

  cursor: pointer;

  fill: var(--light-Grey);
`;

export const RemoveIcon = styled(Trash)`
  ${iconsCSS}
  top: .5rem;
  right: 0.5rem;
`;

export const EditIcon = styled(Edit)`
  ${iconsCSS}
  top: .5rem;
  right: 3rem;
`;

export const CreateAddress = styled.div`
  position: relative;
  min-height: 12rem;

  border: 1px solid var(--light-Grey);
  margin: 0.5rem;

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
