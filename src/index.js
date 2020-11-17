import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from 'src/App';
import * as serviceWorker from './serviceWorker';
// Import global user state provider
import { UserStoreProvider } from './userStore';

// Wrap the whole app so that user data can be used everywhere
function WrappedApp() {
  return (
    <UserStoreProvider>
      <App />
    </UserStoreProvider>
  );
}

ReactDOM.render(<WrappedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
