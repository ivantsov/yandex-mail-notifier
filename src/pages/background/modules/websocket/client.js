import qs from 'query-string';
import {RECONNECT, NEW_MESSAGE} from './constants';

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

// use lazy-function because we always need to return the same value
const getSessionId = (() => {
    const mask = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
    const availableChars = '0123456789ABCDEF';

    const sessionId = mask
        .split('')
        .map(char => char !== 'x' ? char : availableChars[Math.floor(16 * Math.random())])
        .join('');

    return () => sessionId;
})();

function connect({
    uid,
    token,
}) {
    const queryParams = qs.stringify({
        client: 'bar',
        service: 'mail',
        session: getSessionId(),
        oauth_token: token,
        uid,
    });

    disconnect();

    ws = new WebSocket(`wss://push.yandex.ru/v1/subscribe?${queryParams}`);

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
