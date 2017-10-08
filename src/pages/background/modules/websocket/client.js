import qs from 'query-string';
import sessionId from '../../utils/session-generator';
import resolveUrl from '../../utils/url-resolver';
import {
  ERROR,
  MESSAGE,
} from './constants';

let ws, emitEvent;

function onClose(err) {
  // TODO: remove it
  console.log('ON SOCKET CLOSE', arguments.length); // eslint-disable-line
  console.error('[SOCKET]: Socket is closed', err); // eslint-disable-line no-console
  emitEvent(ERROR, err);
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

  ws.addEventListener('error', onClose, false);
  ws.addEventListener('close', onClose, false);
  ws.addEventListener('message', onMessage, false);
}

function disconnect() {
  if (ws) {
    ws.close();

    ws.removeEventListener('error', onClose, false);
    ws.removeEventListener('close', onClose, false);
    ws.removeEventListener('message', onMessage, false);
  }
}

export default function (ev) {
  emitEvent = ev;

  return {
    connect,
    disconnect,
  };
}
