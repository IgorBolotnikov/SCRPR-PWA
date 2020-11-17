import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import useUserStore from './userStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({
  children,
  ...rest
}: PrivateRouteProps): React.ReactElement {
  const user = useUserStore();

  return (
    <Route
      {...rest}
      render={({ location }): React.ReactElement => (user.isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: { from: location },
          }}
        />
      )) as React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>}
    />
  );
}
