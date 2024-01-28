import styled, { css } from 'styled-components';

import { Cart } from '@styled-icons/boxicons-regular';
import { LogOut } from '@styled-icons/boxicons-regular/LogOut';
import { Users, DocumentDuplicate } from '@styled-icons/heroicons-outline';
import { ChevronDoubleLeft } from 'styled-icons/bootstrap';

export const Container = styled.nav`
  background: #f8f9fa;
  border-right: 1px solid #ddd;

  flex-shrink: 0;
  max-width: 16rem;
  width: 100%;
  transition: max-width 200ms ease;
  overflow: hidden;

  &.closed {
    max-width: 2.5rem;
  }
`;

export const Header = styled.header`
  position: relative;
  background: #272b30;
  height: 2.5rem;
`;

export const Chevron = styled(ChevronDoubleLeft)`
  width: 2.5rem;
  height: 100%;

  position: absolute;
  right: 0;
  top: 0;

  cursor: pointer;
  fill: #f8f9fa;
  background: #3e4043;

  &.rotate {
    transform: rotate3d(0, 0, 1, 180deg);
  }
`;

export const Title = styled.h1`
  font-size: 1.4rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  color: gray;
  margin-bottom: 0;
`;

export const Nav = styled.ul`
  height: calc(100% - 2.5rem);

  display: flex;
  flex-direction: column;
`;

export const NavItem = styled.li`
  &:last-child {
    margin-top: auto;
  }

  &.logout {
    cursor: pointer;

    padding: 1rem 0.5rem;
    width: 100%;

    display: flex;
    align-items: flex-end;
    flex-wrap: nowrap;
    white-space: nowrap;

    transition: font-weight 200ms ease;

    &:hover,
    &.active {
      background: rgba(0, 0, 0, 0.02);
      font-weight: bold;

      svg {
        color: #161616;
      }
    }
  }

  a {
    padding: 1rem 0.5rem;
    width: 100%;
    text-decoration: none;
    color: inherit;

    display: flex;
    align-items: flex-end;
    flex-wrap: nowrap;

    transition: font-weight 200ms ease;

    &:hover,
    &.active {
      background: rgba(0, 0, 0, 0.02);
      font-weight: bold;

      svg {
        color: #161616;
      }
    }
  }
`;

const iconsCSS = css`
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;

  margin-right: 0.5rem;

  color: gray;
  transition: color 200ms ease;
`;

export const ProductIcon = styled(Cart)`
  ${iconsCSS}
`;
export const UsersIcon = styled(Users)`
  ${iconsCSS}
`;
export const OrdersIcon = styled(DocumentDuplicate)`
  ${iconsCSS}
`;

export const LogoutIcon = styled(LogOut)`
  ${iconsCSS}
`;
