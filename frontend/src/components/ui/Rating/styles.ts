import styled, { css } from "styled-components";
import { StarFill, StarHalf, Star } from "@styled-icons/bootstrap";

export const Container = styled.div``;

const IconsCSS = css`
  width: 1.5rem;
  height: 1.5rem;
  fill: yellow;
`;

export const FullStar = styled(StarFill)`
  ${IconsCSS}
`;
export const HalfStar = styled(StarHalf)`
  ${IconsCSS}
`;
export const EmptyStar = styled(Star)`
  ${IconsCSS}
`;
