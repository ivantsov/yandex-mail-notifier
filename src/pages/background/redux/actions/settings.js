import {LOAD_SETTINGS, UPDATE_SETTINGS} from 'shared/redux-consts/settings';
import {initialState as defaultValues} from '../reducers/settings';

const chromeStore = chrome.storage.sync;

export function loadSettings() {
    return async (dispatch) => {
        return new Promise(resolve => {
            // get all items in the storage with fallback using default values
            chromeStore.get(defaultValues, optionValues => {
                const data = Object.keys(defaultValues).reduce((obj, key) => {
                    obj[key] = optionValues[key]; // eslint-disable-line no-param-reassign
                    return obj;
                }, {});

                dispatch({
                    type: LOAD_SETTINGS,
                    data,
                });

                resolve();
            });
        });
    };
}

export function updateSettings(data) {
    chromeStore.set(data);

    return {
        type: UPDATE_SETTINGS,
        data,
    };
}
