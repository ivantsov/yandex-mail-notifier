import {LOAD_SETTINGS, UPDATE_SETTINGS} from '../constants/settings';

export const initialState = {
    newMessageNotification: 1, // only desktop notification
    unreadMessagesNotification: 5 * 60 * 1000, // 5 mins
    unreadMessagesSound: false,
    notAuthNotification: 1 // only desktop notification
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_SETTINGS:
            return action.data;
        case UPDATE_SETTINGS:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}
