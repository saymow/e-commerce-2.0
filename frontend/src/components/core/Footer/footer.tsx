import React from "react";

import Link from "../Link";

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
              <Link href="/profile">profile</Link>
            </Item>
          </ItemList>
        </Section>
        <Section>
          <h1>Recent relases</h1>
          <ItemList>
            <Item>
              <Link href="_">Airpods Wireless Headphones</Link>
            </Item>
            <Item>
              <Link href="_">Amazon Alexa</Link>
            </Item>
          </ItemList>
        </Section>
        <Section>
          <h1>Subscribe to our newsletter</h1>
          <Input id="email" type="email" placeholder="Email"></Input>
          <Button>Subscribe</Button>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Footer;
