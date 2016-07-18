import 'babel-polyfill';
import 'whatwg-fetch/fetch';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';

import { store as storeReducer } from './reducers/index';
import { schema as storeSchema } from './reducers/schema.js';

import { Hello } from './components/Hello';

// Define store enhancer (activate chrome redux-devtools for dev builds only)
let storeEnhancer;

if (__DEV__) {
  // If in dev mode activate chrome redux-devtools as well as thunking
  storeEnhancer = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
} else {
  storeEnhancer = applyMiddleware(thunk);
}

// Create store
const store = createStore(
  enableBatching(storeReducer),
  storeSchema,
  storeEnhancer
);


// Get the root application DOMNode
const applicationMountNode = document.getElementById('main');

// ReactDom.render(
//   <Router history={browserHistory} routes={routeConfig} />,
//   applicationMountNode
// );

ReactDom.render(
  <Provider store={store}>
    <Hello />
  </Provider>
  ,
  applicationMountNode
);
