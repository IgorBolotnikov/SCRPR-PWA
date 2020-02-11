import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useUserStore from './userStore';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({ children, ...rest }) {
  const user = useUserStore();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
