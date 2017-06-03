import {UPDATE_SETTINGS} from 'shared/redux-consts/settings';
import storage from '../../modules/storage';

// eslint-disable-next-line import/prefer-default-export
export function updateSettings(data) {
    return (dispatch, getState) => {
        const {settings} = getState();
        const nextSettings = {
            ...settings,
            ...data,
        };

        storage.set('settings', nextSettings);

        dispatch({
            type: UPDATE_SETTINGS,
            data: nextSettings,
        });
    };
}
