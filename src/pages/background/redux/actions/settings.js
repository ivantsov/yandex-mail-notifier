import {LOAD_SETTINGS, UPDATE_SETTINGS} from 'shared/redux-consts/settings';
import store from '../store';
import {initialState as defaultValues} from '../reducers/settings';

const chromeStore = chrome.storage.sync;

export function loadSettings() {
    // get all items in the storage with fallback using default values
    chromeStore.get(defaultValues, optionValues => {
        const data = Object.keys(defaultValues).reduce((obj, key) => {
            obj[key] = optionValues[key];
            return obj;
        }, {});

        store.dispatch({
            type: LOAD_SETTINGS,
            data
        });
    });
}

export function updateSettings(data) {
    chromeStore.set(data);

    return {
        type: UPDATE_SETTINGS,
        data
    };
}
