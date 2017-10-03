import {subscribe} from 'redux-subscriber';
import store from '../redux/store';
import {showUnreadNotification, showNotAuthNotification} from '../redux/actions/notification';

const ALARMS = {
  UNREAD: 'UNREAD',
  NOT_AUTH: 'NOT_AUTH',
};
const {alarms} = chrome;

alarms.onAlarm.addListener(({name}) => {
  const {dispatch} = store;

  if (name === ALARMS.UNREAD) {
    dispatch(showUnreadNotification());
  } else if (name === ALARMS.NOT_AUTH) {
    dispatch(showNotAuthNotification());
  }
});

function initUnreadNotification({user, settings: {unreadMessagesNotification}}) {
  // on "unreadMessagesNotification" change + user is logged out
  if (!user.authorized) {
    return;
  }

  alarms.clear(ALARMS.UNREAD); // on "unreadMessagesNotification" change + user is logged in
  alarms.clear(ALARMS.NOT_AUTH); // on login

  if (unreadMessagesNotification) {
    alarms.create(ALARMS.UNREAD, {periodInMinutes: unreadMessagesNotification});
  }
}

function initNotAuthNotification({user, settings}) {
  // on "notAuthNotification" change + user is logged in
  if (user.authorized) {
    return;
  }

  alarms.clear(ALARMS.NOT_AUTH); // on "notAuthNotification" change + user is logged out
  alarms.clear(ALARMS.UNREAD); // on logout

  if (settings.notAuthNotification) {
    alarms.create(ALARMS.NOT_AUTH, {periodInMinutes: 5});
  }
}

export default function () {
  subscribe('user.authorized', (state) => {
    if (state.user.authorized) {
      initUnreadNotification(state);
    } else {
      initNotAuthNotification(state);
    }
  });

  subscribe('settings.unreadMessagesNotification', initUnreadNotification);
  subscribe('settings.notAuthNotification', initNotAuthNotification);
}
