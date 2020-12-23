import styled from "styled-components";
import { css } from "styled-components";
import { Trash } from "@styled-icons/boxicons-regular";
import { Edit } from "@styled-icons/boxicons-regular";

export const Container = styled.article`
  position: relative;

  /* margin: 0.5rem; */
  padding: 2rem;
  border: 1px solid var(--light-Grey);
`;

const iconsCSS = css`
  position: absolute;
  width: 2rem;
  height: 2rem;

  cursor: pointer;

  fill: var(--light-Grey);
`;

export const InfoLine = styled.p``;

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
