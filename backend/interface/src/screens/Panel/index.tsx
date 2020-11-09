import React from 'react';

import { Container, PanelRouteWrapper } from './styles';
import Sidebar from '../../components/Sidebar';
import { Switch, Route } from 'react-router-dom';

import Products from './Products';

const Panel: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <PanelRouteWrapper>
        <Switch>
          <Route path="/panel/products" component={Products} />
        </Switch>
      </PanelRouteWrapper>
    </Container>
  );
};

export default Panel;
