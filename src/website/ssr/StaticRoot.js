import React from 'react';
import { Provider } from 'react-redux';

import { StaticRouter as Router, Route } from 'react-router';

import App from '../src/components/App/App';

const Root = ({ location, store, context }) => {
  return (
    <Provider store={store}>
      <Router location={location} basename="/default/static" context={context} >
        <Route path="/:filter?" component={App} />
      </Router>
    </Provider>
  );
};

export default Root;