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
  border: 1px solid var(--primary-Color);

  background: var(--primary-Color);
  color: var(--bg-Color);

  transition: all 200ms ease;

  &:hover {
    background: var(--bg-Color);
    color: var(--primary-Color);
  }

  &:disabled {
    filter: brightness(60%);
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
