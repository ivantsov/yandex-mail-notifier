import openUrl from 'shared/utils/tab';
import i18n from 'shared/utils/i18n';
import store from '../../redux/store';
import {subscribe} from '../../redux/subscriber';
import {show, play} from './utils';

const fiveMin = 5 * 60 * 1000;
const {getState} = store;
let unreadMessagesTimer, notAuthTimer;

export function showNewMessage(data) {
    const {newMessageNotification} = getState().settings;

    if (newMessageNotification) {
        show({
            title: data.from,
            subTitle: data.subject,
            message: data.message,
            onClick() {
                openUrl(`#message/${data.id}`);
            }
        });

        if (newMessageNotification === 2) {
            play();
        }
    }
}

function runUnreadNotification() {
    const {messages, settings} = getState();

    show({
        title: i18n.text('notification.unread.title'),
        subTitle: i18n.text('notification.unread.message', messages.unreadCount),
        onClick: openUrl
    });

    if (settings.unreadMessagesSound) {
        play();
    }
}

function runNotAuthNotification() {
    const {notAuthNotification} = getState().settings;

    if (notAuthNotification) {
        show({
            title: i18n.text('notification.notAuth.title'),
            subTitle: i18n.text('notification.notAuth.message'),
            onClick: openUrl
        });

        if (notAuthNotification === 2) {
            play();
        }
    }
}

function initUnreadNotification({user, settings: {unreadMessagesNotification}}) {
    // on "unreadMessagesNotification" change + user is logged out
    if (!user.authorized) {
        return;
    }

    clearInterval(unreadMessagesTimer); // on "unreadMessagesNotification" change + user is logged in
    clearInterval(notAuthTimer); // on login

    if (unreadMessagesNotification) {
        unreadMessagesTimer = setInterval(runUnreadNotification, unreadMessagesNotification);
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
        notAuthTimer = setInterval(runNotAuthNotification, fiveMin);
    }
}

export default function () {
    subscribe('user.authorized', (state) => {
        if (state.user.authorized) {
            initUnreadNotification(state)
        }
        else {
            initNotAuthNotification(state)
        }
    });

    subscribe('settings.unreadMessagesNotification', initUnreadNotification);
    subscribe('settings.notAuthNotification', initNotAuthNotification);
}
