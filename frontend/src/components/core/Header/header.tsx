import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartState } from "../../../@types/redux";
import { openCart } from "../../../actions/uiActions";
import useSession from "../../../hooks/useSession";
import { reduxStore } from "../../../store";
import Link from "../Link";

import {
  Container,
  Wrapper,
  Title,
  Nav,
  NavItems,
  Item,
  CartIconContainer,
  CartIcon,
} from "./styles";

const Header: React.FC = () => {
  const [productsQty, setProductsQty] = useState(0);
  const dispatch = useDispatch();
  const [user, loading] = useSession();

  const { products } = useSelector<typeof reduxStore>(
    (state) => state.cart
  ) as CartState;

  useEffect(() => {
    const newQty = products.reduce((acumm, current) => acumm + current.qty, 0);
    setProductsQty(newQty);
  }, [products]);

  const handleOpenCart = () => {
    dispatch(openCart());
  };

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
              {user ? (
                <Link href="/profile">Profile</Link>
              ) : (
                <Link href="/signin">Sign in</Link>
              )}
            </Item>
            <Item>
              <CartIconContainer qty={productsQty} onClick={handleOpenCart}>
                <CartIcon />
              </CartIconContainer>
            </Item>
          </NavItems>
        </Nav>
      </Wrapper>
    </Container>
  );
};

export default Header;
