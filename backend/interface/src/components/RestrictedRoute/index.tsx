import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UsersLoginState } from '../../@types/redux/user';

import { ReduxState } from '../../store';

interface Props extends RouteProps {
  authenticate?: boolean;
  fallback?: '/' | '/panel' | '/panel/users';
}

const RestrictedRoute: React.FC<Props> = ({
  authenticate = true,
  fallback = '/',
  ...rest
}) => {
  const { user } = useSelector<typeof ReduxState>(
    state => state.userLogin
  ) as UsersLoginState;

  return Boolean(user) === authenticate ? (
    <Route {...rest} />
  ) : (
    <Redirect to={fallback} />
  );
};

export default RestrictedRoute;
