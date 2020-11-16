import React from "react";
import Link from "next/link";

import {
  Container,
  Wrapper,
  Title,
  Nav,
  NavItems,
  Item,
  CartIcon,
} from "./styles";

const Header: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Title>
          <Link href="/">eCommerce</Link>
        </Title>
        <Nav>
          <NavItems>
            <Item>
              <Link href="/shop">Shop</Link>
            </Item>
            <Item>
              <Link href="/contact">Contact</Link>
            </Item>
            <Item>
              <Link href="/profile">Profile</Link>
            </Item>
            <Item>
              <CartIcon />
            </Item>
          </NavItems>
        </Nav>
      </Wrapper>
    </Container>
  );
};

export default Header;
