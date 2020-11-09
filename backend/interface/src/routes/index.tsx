import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Authentication from '../screens/Authentication';
import Panel from '../screens/Panel';

import RestrictedRoute from '../components/RestrictedRoute';
import { useDispatch } from 'react-redux';
import { getAuthStatus } from '../actions/userActions';

const Router: React.FC = () => {
  useDispatch()(getAuthStatus());
  return (
    <BrowserRouter>
      <Switch>
        <RestrictedRoute
          path="/"
          fallback="/panel"
          authenticate={false}
          exact
          component={Authentication}
        />
        <RestrictedRoute path="/panel" component={Panel} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
