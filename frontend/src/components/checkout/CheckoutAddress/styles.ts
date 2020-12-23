import styled from "styled-components";

export const Container = styled.main`
  height: 100%;
`;

export const PrimaryView = styled.div`
  position: relative;
  height: 100%;
  padding: 3rem 1rem;

  overflow: hidden;
`;

export const SecondaryView = styled.div``;

export const Label = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  cursor: pointer;

  background: var(--secondary-Color);
  padding: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateX(100%);

  &:hover {
    transform: translateX(0);
  }

  transition: transform 400ms ease;

  > span {
    font-size: 1.4;
    text-transform: uppercase;
    z-index: 2;
  }

  > div {
    position: absolute;
    background: var(--secondary-Color);
    z-index: 1;

    top: 50%;
    left: 0;

    width: 1.6rem;
    height: 1.6rem;

    transform: translate(-50%, -50%) rotate(45deg);
  }
`;
