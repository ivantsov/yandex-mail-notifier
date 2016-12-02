import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {createBackgroundStore} from 'redux-webext';
import initSubscriber from 'redux-subscriber';
import {LOAD_MESSAGES, UPDATE_MESSAGE} from 'shared/redux-consts/messages';
import {UPDATE_SETTINGS} from 'shared/redux-consts/settings';
import reducer from './reducers';
import {updateSettings} from './actions/settings';
import {
    loadMessages,
    updateMessage,
    invalidateMessages
} from './actions/messages';

const middlewares = [
    thunkMiddleware,
    createLogger({collapsed: true})
];

const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
);

initSubscriber(store);

export default createBackgroundStore({
    store,
    actions: {
        [LOAD_MESSAGES]: loadMessages,
        [UPDATE_MESSAGE]: updateMessage,
        [UPDATE_SETTINGS]: updateSettings
    },
    onDisconnect: invalidateMessages
});
