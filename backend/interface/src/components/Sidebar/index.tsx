import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  Chevron,
  Container,
  Header,
  LogoutIcon,
  Nav,
  NavItem,
  OrdersIcon,
  ProductIcon,
  Title,
  UsersIcon,
} from './styles';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../actions/userActions';

const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const [isClosed, setIsClosed] = useState(false);
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const handleToggleBar = () => {
    setIsClosed(prev => !prev);
  };

  return (
    <Container className={isClosed ? 'closed' : ''}>
      <Header>
        <Title>Ecommerce</Title>
        <Chevron
          className={isClosed ? 'rotate' : ''}
          onClick={handleToggleBar}
        />
      </Header>
      <Nav>
        <NavItem>
          <Link
            className={pathname.startsWith('/panel/products') ? 'active' : ''}
            to="/panel/products"
          >
            <ProductIcon />
            <span className="link-name">Products</span>
          </Link>
        </NavItem>
        <NavItem>
          <Link
            className={pathname.startsWith('/panel/users') ? 'active' : ''}
            to="/panel/users"
          >
            <UsersIcon />
            <span className="link-name">Users</span>
          </Link>
        </NavItem>
        <NavItem>
          <Link
            className={pathname.startsWith('/panel/orders') ? 'active' : ''}
            to="/panel/orders"
          >
            <OrdersIcon />
            <span className="link-name">Orders</span>
          </Link>
        </NavItem>
        <NavItem className="logout" onClick={handleLogout}>
          <LogoutIcon />
          Sign out
        </NavItem>
      </Nav>
    </Container>
  );
};

export default SideBar;
