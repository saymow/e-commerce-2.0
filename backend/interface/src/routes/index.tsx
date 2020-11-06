import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Authentication from '../screens/Authentication';

import RestrictedRoute from '../components/RestrictedRoute';
import { useDispatch } from 'react-redux';
import { getAuthStatus } from '../actions/usersActions';

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
        <RestrictedRoute path="/panel" exact component={() => <h1>todo</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
