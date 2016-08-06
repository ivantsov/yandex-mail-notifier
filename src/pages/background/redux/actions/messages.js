import store from '../store';
import {
    LOAD_MESSAGES_COUNT,
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR,
    UPDATE_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_ERROR
} from '../constants/messages';
import {
    getMessages,
    getMessagesCount,
    updateMessageStatus
} from '../../utils/api';

export async function loadMessagesCount(data) {
    const unreadMessagesCount = data || await getMessagesCount();

    store.dispatch({
        type: LOAD_MESSAGES_COUNT,
        data: unreadMessagesCount
    });
}

export async function loadMessages() {
    store.dispatch({type: LOAD_MESSAGES});

    try {
        const data = await getMessages();

        store.dispatch({
            type: LOAD_MESSAGES_SUCCESS,
            data
        });
    }
    catch (err) {
        store.dispatch({type: LOAD_MESSAGES_ERROR});
    }
}

export function updateMessage(data) {
    updateMessageStatus(data);

    store.dispatch({
        type: UPDATE_MESSAGE_SUCCESS,
        id: data.id
    });
}

export function showNewMessage(data) {
    //TODO: notification
    console.log('NEW MESSAGE');
}
