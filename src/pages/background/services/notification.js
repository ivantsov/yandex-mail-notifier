import store from '../redux/store';
import {showUnreadNotification, showNotAuthNotification} from '../redux/actions/notification';
import {subscribe} from '../redux/subscriber';

const fiveMin = 5 * 60 * 1000;
let unreadMessagesTimer, notAuthTimer;

function initUnreadNotification({user, settings: {unreadMessagesNotification}}) {
    // on "unreadMessagesNotification" change + user is logged out
    if (!user.authorized) {
        return;
    }

    clearInterval(unreadMessagesTimer); // on "unreadMessagesNotification" change + user is logged in
    clearInterval(notAuthTimer); // on login

    if (unreadMessagesNotification) {
        unreadMessagesTimer = setInterval(() => {
            store.dispatch(showUnreadNotification());
        }, unreadMessagesNotification);
    }
}

function initNotAuthNotification({user, settings}) {
    // on "notAuthNotification" change + user is logged in
    if (user.authorized) {
        return;
    }

    clearInterval(notAuthTimer); // on "notAuthNotification" change + user is logged out
    clearInterval(unreadMessagesTimer); // on logout

    if (settings.notAuthNotification) {
        notAuthTimer = setInterval(() => {
            store.dispatch(showNotAuthNotification())
        }, fiveMin);
    }
}

export default function () {
    subscribe('user.authorized', (state) => {
        if (state.user.authorized) {
            initUnreadNotification(state);
        }
        else {
            initNotAuthNotification(state);
        }
    });

    subscribe('settings.unreadMessagesNotification', initUnreadNotification);
    subscribe('settings.notAuthNotification', initNotAuthNotification);
}
