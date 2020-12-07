import { useObservable } from '@libreact/use-observable';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from 'src/App';
import { getUser$ } from 'src/shared/state/user/user.query';
import { anonymousUser } from 'src/shared/state/user/user.store';

import * as serviceWorker from './serviceWorker';
// Import global user state provider
import { UserContextProvider } from './userStore';

// Wrap the whole app so that user data can be used everywhere
function WrappedApp() {
  const [user] = useObservable(getUser$, anonymousUser);

  return (
    <UserContextProvider value={user}>
      <App />
    </UserContextProvider>
  );
}

ReactDOM.render(<WrappedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
