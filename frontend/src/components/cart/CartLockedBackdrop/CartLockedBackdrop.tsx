import React from "react";

import { Container, LockIcon, Backdrop, Message } from "./styles";

export interface Props {
  dimensions: { height: number; scrollTop: number };
  locked: boolean;
}

const CartLockedBackdrop: React.FC<Props> = ({
  dimensions: { height, scrollTop },
  locked,
}) => {
  if (!locked) return null;

  return (
    <Container>
      <Message scrollTop={scrollTop}>
        <LockIcon />
        <h2>Your cart is locked during checkout process.</h2>
      </Message>
      <Backdrop height={height}></Backdrop>
    </Container>
  );
};

export default CartLockedBackdrop;
