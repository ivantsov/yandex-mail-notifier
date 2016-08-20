import debounce from 'lodash.debounce';
import {getSocketCredentials} from '../../utils/api';
import subscribe from '../../redux/subscribers/user';
import {login, logout} from '../../redux/actions/user';
import {loadMessagesCount} from '../../redux/actions/messages';
import {getUid} from '../cookie';
import {showNewMessage} from '../notification';
import {RECONNECT, NEW_MESSAGE} from './constants';
import initWSClient from './client';

const config = {
    cookieTimeout: 1000,
    connectTryInterval: 30 * 1000, // 30 sec, try to connect if failed before
    reconnectInterval: 2 * 60 * 1000 // 2 min, just reconnect
};

let wsClient, reconnectTimer;

async function connect() {
    clearTimeout(reconnectTimer);

    try {
        const uid = await getUid();
        const credentials = await getSocketCredentials(uid);

        reconnectTimer = setTimeout(reconnect, config.reconnectInterval);
        wsClient.connect(credentials);

        loadMessagesCount();
        login();
    }
    catch (err) {
        setTimeout(connect, config.connectTryInterval);

        logout();
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
    const {
        operation,
        new_messages: unreadCount,
        mid: id,
        hdr_status: status,
        hdr_from: from,
        hdr_subject: subject,
        firstline: message
    } = data;

    if (operation === 'insert' && status === 'New') {
        const nameMatch = from.match(/^"(.+)"/);
        const emailMatch = from.match(/<(.+)>$/);

        loadMessagesCount(parseInt(unreadCount, 10));
        showNewMessage({
            id,
            from: nameMatch[1] || emailMatch[1],
            subject: subject !== 'No subject' ? subject : '',
            message
        });
    }
    else {
        loadMessagesCount();
    }
}

function emitEvent(eventType, data) {
    if (eventType === RECONNECT) {
        reconnect();
    }
    if (eventType === NEW_MESSAGE) {
        onNewMessage(data);
    }
}

export default function () {
    wsClient = initWSClient(emitEvent);

    // UID might not be set immediately, this's why we delay it with timeout
    subscribe('login', () => setTimeout(reconnect, config.cookieTimeout));
    subscribe('logout', disconnect);
}
