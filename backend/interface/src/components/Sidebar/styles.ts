import styled, { css } from 'styled-components';

import { Cart } from '@styled-icons/boxicons-regular';
import { Users, DocumentDuplicate } from '@styled-icons/heroicons-outline';

export const Container = styled.nav`
  background: #f8f9fa;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  max-width: 14rem;
  width: 100%;

  border-right: 1px solid #ddd;
`;

export const Title = styled.h1`
  font-size: 1.2rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  color: gray;
  background: #272b30;
`;

export const Nav = styled.ul`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const NavItem = styled.li`
  padding: 0.7rem 0.5rem;

  a {
    text-decoration: none;
    color: inherit;

    display: flex;
    align-items: center;

    transition: font-weight 200ms ease;

    &:hover,
    &.active {
      font-weight: bold;

      svg {
        color: #161616;
      }
    }
  }
`;

const iconsCSS = css`
  width: 1.2rem;
  height: 1.2rem;

  margin-right: 0.2rem;

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
