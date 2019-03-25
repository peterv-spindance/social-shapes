import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    createLogger()
  ),
);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);