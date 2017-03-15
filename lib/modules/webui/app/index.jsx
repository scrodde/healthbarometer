import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import _ from 'lodash';
import queryString from 'query-string';

import { signIn, authError, entryRestore } from './actions';
import { api } from './lib/api';
import reducers from './reducers';
import App from './components/App';

/**
 * INIT STORE
 *
 */
const initialState = {
  config: {
    apiBaseUrl: _.get(window, 'Config.apiBaseUrl'),
    baseUrl: _.get(window, 'Config.baseUrl'),
    authUrl: _.get(window, 'Config.authUrl'),
  },
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, initialState, composeEnhancers(
  applyMiddleware(thunk)
));

store.dispatch(entryRestore());

/**
 * INIT API
 */
api.setOptions({
    baseURL: initialState.config.apiBaseUrl,
    timeout: 10000,
});
api.on('unauthorized', () => {
  store.dispatch(authError('You need to sign in to proceed.'));
});

/**
 * INIT AUTH
 */
let qs = queryString.parse(window.location.search);
const loginToken = _.get(qs, 'token', null);
const error      = _.get(qs, 'error', null);
const restoredToken = window.localStorage.getItem('token');
const token = loginToken || restoredToken;
/**
 * ORDER IMPORTANT!
 */
if (error) {
  // delete qs['error'];
  //window.location.search = queryString.stringify(qs);
  store.dispatch(authError(error));
} else if (token) {
  api.setToken(token);
  // if (loginToken) {
  //   delete qs['token'];
  //   window.location.search = queryString.stringify(qs);
  // }
  store.dispatch(signIn(token));
}

window.addEventListener('load', () => {
// document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  , document.getElementById('container'));
});
