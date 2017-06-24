import 'babel-polyfill';
import {LOAD_STORAGE_DATA} from 'shared/redux-consts/meta';
import store from './redux/store';
import './redux/ext-store'; // init redux-webext store
import {login} from './redux/actions/user';
import storage from './modules/storage';
import initWS from './modules/websocket';
import initCookieListener from './modules/cookie';
import initNotification from './modules/notification';
import initButtonState from './modules/popup-button';

async function loadStorageData() {
    const data = await storage.getAll();

    // TODO remove when errors are gone
    if (data && data.settings) {
        const {
            newMessageNotification,
            unreadMessagesNotification,
            notAuthNotification,
        } = data.settings;

        const newData = {
            ...data,
            settings: {
                ...data.settings,
                newMessageNotification: parseInt(newMessageNotification, 10),
                unreadMessagesNotification: parseInt(unreadMessagesNotification, 10),
                notAuthNotification: parseInt(notAuthNotification, 10),
            },
        };

        storage.set('settings', newData.settings);

        store.dispatch({
            type: LOAD_STORAGE_DATA,
            data: newData,
        });

        return;
    }

    store.dispatch({
        type: LOAD_STORAGE_DATA,
        data,
    });
}

function initModules() {
    initWS();
    initCookieListener();
    initNotification();
    initButtonState();
}

(async () => {
    // we should prepare the store before starting any service
    await loadStorageData();

    initModules();

    store.dispatch(login());
})();
