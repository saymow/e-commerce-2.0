import styled, { css } from "styled-components";

import { ChevronRight, ChevronLeft } from "@styled-icons/boxicons-regular";

export const Container = styled.div`
  margin: auto;

  display: flex;
  align-items: center;

  svg,
  span {
    &.active,
    &:hover {
      background: #5f00ba;
      color: #fff;
    }
  }
`;

const iconsCSS = css`
  cursor: pointer;

  width: 2.5rem;
  height: 2.5rem;

  &.disabled {
    opacity: 0.2;
    cursor: inherit;
  }
`;

export const PaginateButton = styled.span`
  cursor: pointer;
  padding: 0.3rem 0.8rem;

  font-size: 1.2rem;
`;

export const BackArrow = styled(ChevronLeft)`
  ${iconsCSS}
`;

export const ForwardArrow = styled(ChevronRight)`
  ${iconsCSS}
`;
