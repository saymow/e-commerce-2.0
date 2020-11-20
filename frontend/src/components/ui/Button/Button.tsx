import React, { ButtonHTMLAttributes } from "react";

import styled from "styled-components";

interface Props {
  variant?: "normal" | "fill";
}

const Container = styled.button<Props>`
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;

  padding: 0.8rem 5rem;
  border: 1px solid #000;

  background: #000;
  color: #fff;

  transition: all 200ms ease;

  &:hover {
    background: #fff;
    color: #000;
  }

  width: ${({ variant }) => (variant == "fill" ? "100%" : "auto")};
`;

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({
  children,
  variant = "normal",
  ...rest
}) => {
  return (
    <Container variant={variant} {...rest}>
      {children}
    </Container>
  );
};

export default Button;
