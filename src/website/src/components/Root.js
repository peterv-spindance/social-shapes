import React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter, Route } from 'react-router-dom';
import { StaticRouter } from 'react-router';

import App from './App/App';

const Root = ({ isServer, store }) => {
  const Router = isServer ? StaticRouter : BrowserRouter;
  return (
    <Provider store={store}>
      <Router>
        <Route path="/:filter?" component={App} />
      </Router>
    </Provider>
  );
};

export default Root;