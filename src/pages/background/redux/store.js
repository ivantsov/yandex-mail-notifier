import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createBackgroundStore} from 'redux-webext';
import {LOAD_MESSAGES, UPDATE_MESSAGE} from 'shared/redux-consts/messages';
import {UPDATE_SETTINGS} from 'shared/redux-consts/settings';
import reducer from './reducers';
import {updateSettings} from './actions/settings';
import {
    loadMessages,
    updateMessage,
    invalidateMessages
} from './actions/messages';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const createLogger = require('redux-logger');

    middlewares.push(createLogger({collapsed: true}));
}

const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
);

export default createBackgroundStore({
    store,
    actions: {
        [LOAD_MESSAGES]: loadMessages,
        [UPDATE_MESSAGE]: updateMessage,
        [UPDATE_SETTINGS]: updateSettings
    },
    onDisconnect: invalidateMessages
});
