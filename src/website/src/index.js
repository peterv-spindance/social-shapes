import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(
    thunk,
    createLogger()
  ),
);

ReactDOM.hydrate(
  <Root store={store} />,
  document.getElementById('root')
);