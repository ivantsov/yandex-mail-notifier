import {UPDATE_SETTINGS} from 'shared/redux-consts/settings';

export function updateSettings(name, value) {
    return {
        type: UPDATE_SETTINGS,
        data: {
            [name]: value
        }
    };
}
