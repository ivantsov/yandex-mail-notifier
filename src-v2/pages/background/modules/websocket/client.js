import qs from 'query-string';
import sessionId from '../../utils/session-generator';
import resolveUrl from '../../utils/url-resolver';
import {
  ERROR,
  MESSAGE,
} from './constants';

let ws, emitEvent;

function onClose(err) {
  emitEvent(ERROR, err);
}

function onMessage({data}) {
  emitEvent(MESSAGE, JSON.parse(data));
}

function disconnect() {
  if (ws) {
    ws.close();

    ws.removeEventListener('error', onClose);
    ws.removeEventListener('close', onClose);
    ws.removeEventListener('message', onMessage);
  }
}

function connect({
  uid,
  token,
}) {
  disconnect();

  const queryParams = qs.stringify({
    client: 'bar',
    service: 'mail',
    session: sessionId,
    oauth_token: token,
    uid,
  });

  ws = new WebSocket(resolveUrl(`wss://push.yandex.{domain}/v1/subscribe?${queryParams}`));

  ws.addEventListener('error', onClose);
  ws.addEventListener('close', onClose);
  ws.addEventListener('message', onMessage);
}

export default function (ev) {
  emitEvent = ev;

  return {
    connect,
    disconnect,
  };
}
