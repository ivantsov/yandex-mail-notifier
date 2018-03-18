import {LOGIN, LOGOUT} from 'shared/redux-consts/user';
import qs from 'querystring';
import sessionId from '../../utils/session-generator';
// import storage from '../../modules/storage';
import {loadUser} from '../../utils/api';
import resolveUrl from '../../utils/url-resolver';
import {loadMessagesCount} from "../messages/messages.actions";
import {showNewNotification} from "../notification/notification.actions";

class WS {
  failReconnectTimeout = 5e3;
  pingReconnectTimeout = 59e3;

  constructor(getState, dispatch) {
    this.getState = getState;
    this.dispatch = dispatch;
  }

  onopen = () => {
    this.dispatch({
      type: LOGIN,
      data: this.userData,
    });

    this.pingReconnect();
  }

  onclose = e => {
    // in case when the previous socket was closed
    if (this.ws !== e.target) {
      return;
    }

    console.log('onclose', this.ws === e.target, e)
    if (e.code !== 1000 && e.code !== 1005) {
      this.failReconnect();
    }

    this.dispatch(logout());
  };

  onerror = e => {
    console.log('onerror', e)

    if (e.code === 'ECONNREFUSED') {
      this.failReconnect();
    }

    this.dispatch(logout());
  };

  onmessage = (event) => {
    const {
      operation,
        message,
    } = JSON.parse(event.data);

    if (operation !== 'insert' || message.hdr_status !== 'New') {
      this.dispatch(loadMessagesCount());
      return;
    }

    const {
      new_messages: unreadCount,
      mid: id,
      hdr_from: from,
      hdr_subject: subject,
      firstline,
    } = message;
    const nameMatch = from.match(/^"(.+)"/);
    const emailMatch = from.match(/<(.+)>$/);

    this.dispatch(loadMessagesCount(parseInt(unreadCount, 10)));
    this.dispatch(showNewNotification({
      id,
      from: nameMatch[1] || emailMatch[1],
      subject: subject !== 'No subject' ? subject : '',
      message: firstline,
    }));
  }

  open = async () => {
    try {
      if (this.ws) {
        this.ws.close();
      }

      const {user} = this.getState();
      this.userData = await loadUser(user);
      const queryParams = qs.stringify({
        client: 'bar',
        service: 'mail',
        session: sessionId,
        oauth_token: this.userData.token,
        uid: this.userData.uid,
      });

      this.ws = new WebSocket(resolveUrl(`wss://push.yandex.{domain}/v1/subscribe?${queryParams}`));
      this.ws.onopen = this.onopen;
      this.ws.onclose = this.onclose;
      this.ws.onerror = this.onerror;
      this.ws.onmessage = this.onmessage;
    }
    catch (err) {
      this.failReconnect();
    }
  }

  reconnect = (timeout) => {
    clearTimeout(this.failReconnectTimer);
    clearTimeout(this.pingReconnectTimer);

    return setTimeout(this.open, timeout);
  }

  failReconnect = () => {
    this.failReconnectTimer = this.reconnect(this.failReconnectTimeout);
  }

  pingReconnect = () => {
    this.pingReconnectTimer = this.reconnect(this.pingReconnectTimeout);
  }
}

export function login() {
  return (dispatch, getState) => {
    const ws = new WS(getState, dispatch);
    ws.open();
  };
}

export function logout() {
  // storage.remove('user');

  return {type: LOGOUT};
}
