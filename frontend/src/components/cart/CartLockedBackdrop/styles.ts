import styled from "styled-components";
import { Lock } from "@styled-icons/boxicons-solid";

export const Container = styled.li``;

export const Backdrop = styled.div<{ height: number }>`
  position: absolute;
  left: 0;
  right: 0;
  height: ${({ height }) => height}px;
  z-index: 2;

  background: rgba(0, 0, 0, 0.9);
`;

export const Message = styled.main<{ scrollTop: number }>`
  z-index: 3;
  position: absolute;
  top: calc(50%);
  left: 50%;

  transform: translate(-50%, calc(-50% + ${({ scrollTop }) => scrollTop}px));

  transition: transform 500ms cubic-bezier(0.01, 1.54, 1, 0.28);

  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: #fff;
    margin: 0.6em 0;
    font-size: 2em;
    text-align: center;
  }
`;

export const LockIcon = styled(Lock)`
  width: 6em;
  height: 6em;

  fill: #fff;
`;
