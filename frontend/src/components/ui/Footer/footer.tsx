import React from "react";

import Link from "next/link";

import {
  Container,
  Wrapper,
  Section,
  ItemList,
  Item,
  Input,
  Button,
} from "./styles";

const Footer: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Section>
          <h1>Pages</h1>
          <ItemList>
            <Item>
              <Link href="/">main</Link>
            </Item>
            <Item>
              <Link href="/shop">shop</Link>
            </Item>
            <Item>
              <Link href="/contact-me">contact me</Link>
            </Item>
            <Item>
              <Link href="/proile">profile</Link>
            </Item>
          </ItemList>
        </Section>
        <Section>
          <h1>Recent relases</h1>
          <ItemList>
            <Item>
              <Link href="_">Some product</Link>
            </Item>
            <Item>
              <Link href="_">Other product</Link>
            </Item>
          </ItemList>
        </Section>
        <Section>
          <h1>Subscribe our newsletter</h1>
          <Input id="email" type="email" placeholder="Email"></Input>
          <Button>Subscribe</Button>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Footer;
