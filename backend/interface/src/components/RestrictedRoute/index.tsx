import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { ReduxState } from '../../store';

interface Props extends RouteProps {
  authenticate?: boolean;
  fallback?: '/' | '/panel';
}

const RestrictedRoute: React.FC<Props> = ({
  authenticate = true,
  fallback = '/',
  ...rest
}) => {
  const { auth } = useSelector<typeof ReduxState>(state => state.userLogin) as {
    auth: boolean;
  };

  return Boolean(auth) === authenticate ? (
    <Route {...rest} />
  ) : (
    <Redirect to={fallback} />
  );
};

export default RestrictedRoute;
