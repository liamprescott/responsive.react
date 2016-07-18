import 'babel-polyfill';
import 'whatwg-fetch/fetch';

import React from 'react';
import ReactDom from 'react-dom';
import { applyRouterMiddleware, browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import useScroll from 'react-router-scroll';
import thunk from 'redux-thunk';


// Import components
// import { StockIQ } from './components/StockIQ';
// import { Index as Dashboard } from './components/dashboard/Index';
// import { Index as Sell } from './components/sell/Index';
// import { Summary } from './components/sell/Summary';
// import { Alerts } from './components/sell/Alerts';
// import { Stocklist } from './components/sell/Stocklist';
// import { Index as Vehicle } from './components/sell/vehicle/Index';
// import { Hello } from './components/_temp/Hello';

// import { config as routeConfig } from './routes/_index.dev.config.js';
import { store as storeReducer } from './reducers/index';
import { schema as storeSchema } from './reducers/schema';

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
// store = createStore(
//   enableBatching(storeReducer),
//   storeSchema,
//   applyMiddleware(thunk)
// );


// Get the root application DOMNode
const applicationMountNode = document.getElementById('main');

// ReactDom.render(
//   <Router history={browserHistory} routes={routeConfig} />,
//   applicationMountNode
// );

// routes={routeConfig}

ReactDom.render(
  <Provider store={store}>
    history={browserHistory}
    <Router
      render={applyRouterMiddleware(useScroll(() => true))}
      />
  </Provider>
  ,
  applicationMountNode
);

// ReactDom.render((
//     <Router history={browserHistory}>
//       <Route path="/" component={StockIQ}>
//         <IndexRoute component={Dashboard} />
//         {/* Redirection
//         <Redirect from="sell/alerts*" to="sell/default/alerts" /> // Parse through redirection properties - check for them and auto redirect to correct child route!!!! ouch!!!
//         \*/}
//          <Route path="sell(/:collection)" component={Sell}>
//           <IndexRoute component={Summary} />
//           <Route path="alerts" component={Alerts}>
//             <Route path="hello" component={Hello} />
//           </Route>
//           <Route path="stocklist" component={Stocklist} />
//           <Route path="vehicle" component={Vehicle} />
//         </Route>
//       </Route>
//     </Router>
//   ),
//   applicationMountNode
// );
//
