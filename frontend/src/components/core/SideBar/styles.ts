import styled, { css, keyframes } from "styled-components";
import { CloseSquareOutline } from "@styled-icons/evaicons-outline";
import { Cart2 } from "@styled-icons/bootstrap";
import { Heart } from "@styled-icons/boxicons-regular";

export const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: rgba(0, 0, 0, 0.3);
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const Container = styled.aside<{ duration: number }>`
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  bottom: 0;

  max-width: 25rem;
  width: 100%;
  background: var(--bg-Color);

  transition: ${({ duration }) => `transform ${duration}ms ease`};

  animation: ${slideIn} ${({ duration }) => duration}ms ease;

  &.slide-out {
    transform: translateX(100%);
  }

  display: grid;
  grid-template-rows: 8fr 15fr 77fr;
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem 0 4rem;
`;

export const AsideHeader = styled.header`
  display: flex;
`;

export const AsideNav = styled.nav`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const AsideNavItem = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--lighter-Grey);

  h1 {
    font-size: 1.6rem;
  }

  &.selected {
    border-bottom: solid 0.5rem var(--secondary-Color);
    svg {
      fill: var(--secondary-Color);
    }
  }
`;

const navIconsCss = css`
  width: 2rem;
  height: 2rem;
`;

export const CartIcon = styled(Cart2)`
  ${navIconsCss}
`;

export const WishListIcon = styled(Heart)`
  ${navIconsCss}
`;

export const Content = styled.main`
  padding: 0.5rem;

  overflow: hidden;
`;

export const CloseIcon = styled(CloseSquareOutline)`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;

  cursor: pointer;

  width: 3rem;
  height: 3rem;
`;
