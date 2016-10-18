import {LOAD_MESSAGES, UPDATE_MESSAGE} from 'shared/redux-consts/messages';

export function loadMessages() {
    return {type: LOAD_MESSAGES};
}

export function updateMessage(data) {
    return {
        type: UPDATE_MESSAGE,
        data
    };
}
