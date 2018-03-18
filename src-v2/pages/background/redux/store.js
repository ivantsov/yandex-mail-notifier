import {createStore, applyMiddleware} from 'redux';
import initSubscriber from 'redux-subscriber';
import middlewares from './middlewares';
import rootReducer from './root-reducer';

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);

initSubscriber(store);

export default store;
