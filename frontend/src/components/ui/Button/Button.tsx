import React from "react";

import styled from "styled-components";

const Container = styled.button`
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
`;

const Button: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Button;
