import React, { ButtonHTMLAttributes } from "react";

import styled from "styled-components";
import Loading from "../Loading";

const Container = styled.button<Props>`
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;

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

interface Props {
  variant?: "normal" | "fill";
}

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = ({
  children,
  disabled,
  variant = "normal",
  ...rest
}) => {
  return (
    <Container variant={variant} disabled={disabled} {...rest}>
      {children}
      {disabled && <Loading variant="small" embedded />}
    </Container>
  );
};

export default Button;
