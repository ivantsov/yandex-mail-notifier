import qs from 'query-string';
import {RECONNECT, NEW_MESSAGE} from './constants';

const WS_URL = 'wss://xiva-daria.mail.yandex.net/events/websocket';

let ws, emitEvent;

function onClose(...args) {
    console.error('Socket is closed', args); // eslint-disable-line no-console
    emitEvent(RECONNECT);
}

function onError(...args) {
    console.error('An error has occurred in socket', args); // eslint-disable-line no-console
    emitEvent(RECONNECT);
}

function onMessage({data}) {
    const {operation, message} = JSON.parse(data);

    if (operation !== 'ping') {
        emitEvent(NEW_MESSAGE, message);
    }
}

function connect(data) {
    const {
        sign,
        ts,
        uid,
    } = data;
    const queryParams = qs.stringify({
        client_id: 'bar',
        service: 'mail',
        format: 'json',
        uid,
        sign,
        ts,
    });

    ws = new WebSocket(`${WS_URL}?${queryParams}`);

    ws.addEventListener('close', onClose, false);
    ws.addEventListener('message', onMessage, false);
    ws.addEventListener('error', onError, false);
}

function disconnect() {
    if (ws) {
        ws.close();

        ws.removeEventListener('close', onClose, false);
        ws.removeEventListener('message', onMessage, false);
        ws.removeEventListener('error', onError, false);
    }
}

export default function (ev) {
    emitEvent = ev;

    return {
        connect,
        disconnect,
    };
}
