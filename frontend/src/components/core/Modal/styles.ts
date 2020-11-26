import styled from "styled-components";
import { CloseSquareOutline } from "@styled-icons/evaicons-outline";

export const Container = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 4;
  overflow: hidden;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 99;

  background: rgba(0, 0, 0, 0.3);
`;

export const ModalBox = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;

  transform: translate(-50%, -50%);

  min-width: min(30rem, 90%);

  background: var(--bg-Color);

  h1 {
    text-transform: uppercase;
  }
`;

export const CloseIcon = styled(CloseSquareOutline)`
  cursor: pointer;

  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  width: 2.5rem;
  height: 2.5rem;

  fill: var(--primary-Color);
`;
