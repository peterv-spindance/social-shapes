import React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App/App';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router basename="/default/static" >
        <Route path="/:filter?" component={App} />
      </Router>
    </Provider>
  );
};

export default Root;