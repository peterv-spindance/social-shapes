import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);