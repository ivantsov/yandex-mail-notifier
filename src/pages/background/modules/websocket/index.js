import debounce from 'lodash.debounce';
import {subscribe} from 'redux-subscriber';
import store from '../../redux/store';
import {login, logout} from '../../redux/actions/user';
import {loadMessagesCount} from '../../redux/actions/messages';
import {showNewNotification} from '../../redux/actions/notification';
import {
    RECONNECT,
    NEW_MESSAGE,
    PING,
} from './constants';
import initWSClient from './client';

const config = {
    connectTryInterval: 60 * 1000, // 1 min, try to connect if failed before
    reconnectInterval: 30 * 60 * 1000, // 30 min, reconnect to websocket
};

let wsClient, reconnectTimer;

async function connect() {
    const {dispatch, getState} = store;
    const {
        authorized,
        token,
        uid,
    } = getState().user;

    clearTimeout(reconnectTimer);

    try {
        // eslint-disable-next-line no-use-before-define
        reconnectTimer = setTimeout(reconnect, config.reconnectInterval);

        wsClient.connect({
            uid,
            token,
        });

        dispatch(loadMessagesCount());

        // we don't need to dispatch login action if user is already authorized
        // e.g. after calling "connect" first time the subscriber below will call "reconnect"
        if (!authorized) {
            dispatch(login());
        }
    }
    catch (err) {
        dispatch(logout());

        setTimeout(connect, config.connectTryInterval);

        // throw unhandled exception for raven
        throw err;
    }
}

const reconnect = debounce(() => {
    wsClient.disconnect();
    connect();
}, 500);

function disconnect() {
    clearTimeout(reconnectTimer);
    wsClient.disconnect();
}

function onNewMessage(data) {
    const {dispatch} = store;
    const {
        operation,
        new_messages: unreadCount,
        mid: id,
        hdr_status: status,
        hdr_from: from,
        hdr_subject: subject,
        firstline: message,
    } = data;

    if (operation === 'insert' && status === 'New') {
        const nameMatch = from.match(/^"(.+)"/);
        const emailMatch = from.match(/<(.+)>$/);

        dispatch(loadMessagesCount(parseInt(unreadCount, 10)));
        dispatch(showNewNotification({
            id,
            from: nameMatch[1] || emailMatch[1],
            subject: subject !== 'No subject' ? subject : '',
            message,
        }));
    }
    else {
        dispatch(loadMessagesCount());
    }
}

function emitEvent(eventType, data) {
    if (eventType === RECONNECT) {
        reconnect();
    }
    if (eventType === NEW_MESSAGE) {
        onNewMessage(data);
    }
    if (eventType === PING) {
        store.dispatch(loadMessagesCount());
    }
}

export default function () {
    wsClient = initWSClient(emitEvent);

    subscribe('user.authorized', ({user: {authorized}}) => {
        if (authorized) {
            reconnect();
        }
        else {
            disconnect();
        }
    });
}
