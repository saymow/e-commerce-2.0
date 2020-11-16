import styled from "styled-components";
import { Cart2 } from "@styled-icons/bootstrap";

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;

  background: #fff;
`;

export const Wrapper = styled.div`
  margin: auto;

  max-width: 1260px;
  width: 100%;
  height: 100%;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.125em;
`;

export const Nav = styled.nav``;

export const NavItems = styled.ul`
  display: flex;
  align-items: flex-end;
  list-style: none;
`;

export const Item = styled.li`
  font-size: 1.4rem;
  text-transform: uppercase;

  &:not(:last-child) {
    margin-right: 2rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const CartIcon = styled(Cart2)`
  cursor: pointer;
  height: 2.2rem;
  width: 2.2rem;

  margin-bottom: 0.25rem;
`;
