import styled from "styled-components";

import { Heart } from "@styled-icons/boxicons-regular";

interface Props {
  detailBgColor: string;
}

export const Container = styled.article<Props>`
  position: relative;
  flex: 0 1 32%;

  margin: 1rem 0;

  &:nth-child(3n + 2) {
    margin-left: 2%;
    margin-right: 2%;
  }

  cursor: pointer;

  div h2,
  div span,
  div svg {
    background: #fff;
    transition-property: background, color;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover div h2,
  &:hover div span,
  &:hover div svg {
    background: ${({ detailBgColor }) => detailBgColor};
    color: #fff;
  }
`;

export const Details = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
`;

export const Name = styled.h2`
  font-size: 2rem;
  padding: 0.5rem;
  width: max-content;
`;

export const Price = styled.span`
  font-size: 1.6rem;
  padding: 0.5rem;
`;

export const WishListIcon = styled(Heart)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.5rem;

  width: 3rem;
  height: 3rem;
`;
