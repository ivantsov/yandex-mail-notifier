import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];

/* eslint-disable global-require */
if (__DEV__) {
  const {createLogger} = require('redux-logger');
  middlewares.push(createLogger({collapsed: true}));
} else {
  const ravenMiddleware = require('./raven').default;
  middlewares.push(ravenMiddleware);
}
/* eslint-enable global-require */

export default middlewares;
