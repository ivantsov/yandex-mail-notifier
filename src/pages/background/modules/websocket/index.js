import debounce from 'lodash.debounce';
import {subscribe} from 'redux-subscriber';
import store from '../../redux/store';
import {login, logout} from '../../redux/actions/user';
import {loadMessagesCount} from '../../redux/actions/messages';
import {showNewNotification} from '../../redux/actions/notification';
import {
  ERROR,
  MESSAGE,
} from './constants';
import initWSClient from './client';

const {alarms} = chrome;

const config = {
  connect: {
    name: 'connect',
    time: 1, // try to connect if failed before
  },
  reconnect: {
    name: 'reconnect',
    time: 1.9, // reconnect to websocket; we use double value to prevent receiving the 3rd ping before reconnect
  },
};

let wsClient;

async function connect() {
  const {dispatch, getState} = store;
  const {
    authorized,
    token,
    uid,
  } = getState().user;

  alarms.clear(config.reconnect.name);

  try {
    alarms.create(config.reconnect.name, {delayInMinutes: config.reconnect.time});

    wsClient.connect({
      uid,
      token,
    });

    // we don't need to dispatch login action if user is already authorized
    // e.g. after calling "connect" first time the subscriber below will call "reconnect"
    if (!authorized) {
      dispatch(login());
    }
  } catch (err) {
    dispatch(logout());

    alarms.create(config.connect.name, {delayInMinutes: config.connect.time});

    // throw unhandled exception for raven
    throw err;
  }
}

const reconnect = debounce(() => {
  wsClient.disconnect();
  connect();
}, 500);

function disconnect() {
  alarms.clear(config.reconnect.name);
  wsClient.disconnect();
}

function onMessage(data) {
  const {dispatch} = store;
  const {
    operation,
    message,
  } = data;

  if (operation !== 'insert' || message.hdr_status !== 'New') {
    dispatch(loadMessagesCount());
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

  dispatch(loadMessagesCount(parseInt(unreadCount, 10)));
  dispatch(showNewNotification({
    id,
    from: nameMatch[1] || emailMatch[1],
    subject: subject !== 'No subject' ? subject : '',
    message: firstline,
  }));
}

const IGNORED_ERRORS = [
  1006, // abnormal closure
  4400, // missing uid
];
function onError(err) {
  if (err && !IGNORED_ERRORS.includes(err.code)) {
    window.Raven.captureException(err, {
      extra: err,
    });

    store.dispatch(logout());
    store.dispatch(login());
    // TODO: if the error wouldn't disappear enable reloading
    // reloadApp();

    return;
  }

  reconnect();
}

function emitEvent(eventType, data) {
  if (eventType === ERROR) {
    onError(data);
  }
  if (eventType === MESSAGE) {
    onMessage(data);
  }
}

function handleAlarm({name}) {
  if (name === config.connect.name) {
    connect();
  } else if (name === config.reconnect.name) {
    reconnect();
  }
}

export default function () {
  wsClient = initWSClient(emitEvent);

  alarms.onAlarm.addListener(handleAlarm);

  subscribe('user.authorized', ({user: {authorized}}) => {
    if (authorized) {
      reconnect();
    } else {
      disconnect();
    }
  });
}
