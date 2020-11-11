import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  Container,
  Title,
  Nav,
  NavItem,
  ProductIcon,
  UsersIcon,
  OrdersIcon,
} from './styles';

const SideBar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Link to="/panel">
        <Title>Ecommerce2.0</Title>
      </Link>
      <Nav>
        <NavItem>
          <Link
            className={pathname.startsWith('/panel/products') ? 'active' : ''}
            to="/panel/products"
          >
            <ProductIcon />
            Products
          </Link>
        </NavItem>
        <NavItem>
          <Link
            className={pathname.startsWith('/panel/users') ? 'active' : ''}
            to="/panel/users"
          >
            <UsersIcon />
            Users
          </Link>
        </NavItem>
        <NavItem>
          <Link
            className={pathname.startsWith('/panel/orders') ? 'active' : ''}
            to="/panel/orders"
          >
            <OrdersIcon />
            Orders
          </Link>
        </NavItem>
      </Nav>
    </Container>
  );
};

export default SideBar;
