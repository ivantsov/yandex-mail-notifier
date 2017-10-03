import {createStore, applyMiddleware} from 'redux';
import initSubscriber from 'redux-subscriber';
import middlewares from './middlewares';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(...middlewares),
);

initSubscriber(store);

export default store;
