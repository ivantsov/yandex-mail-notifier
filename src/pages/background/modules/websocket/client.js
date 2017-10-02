import qs from 'query-string';
import sessionId from '../../utils/session-generator';
import resolveUrl from '../../utils/url-resolver';
import {
    RECONNECT,
    MESSAGE,
} from './constants';

let ws, emitEvent;

function onClose(err) {
    console.error('[SOCKET]: Socket is closed', err); // eslint-disable-line no-console
    emitEvent(RECONNECT, err);
}

function onError(...args) {
    console.error('[SOCKET]: An error has occurred in socket', args); // eslint-disable-line no-console
    emitEvent(RECONNECT);
}

function onMessage({data}) {
    emitEvent(MESSAGE, JSON.parse(data));
}

function connect({
    uid,
    token,
}) {
    const queryParams = qs.stringify({
        client: 'bar',
        service: 'mail',
        session: sessionId,
        oauth_token: token,
        uid,
    });

    // eslint-disable-next-line no-use-before-define
    // disconnect();

    ws = new WebSocket(resolveUrl(`wss://push.yandex.{domain}/v1/subscribe?${queryParams}`));

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
