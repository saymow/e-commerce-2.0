import React from "react";
import styled from "styled-components";
import NextLink, { LinkProps } from "next/link";

export const Anchor = styled.a`
  text-decoration: none;
  color: inherit;

  cursor: pointer;
`;

const Link: React.FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <NextLink {...rest}>
      <Anchor>{children}</Anchor>
    </NextLink>
  );
};

export default Link;
