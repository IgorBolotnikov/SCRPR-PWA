import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from 'src/userStore';

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
  const user = useContext(UserContext);

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
