import userSubscribe from '../redux/subscribers/user';
import messagesSubscribe from '../redux/subscribers/messages';

const popup = chrome.browserAction;

function setState(enabled, badge) {
    // enable or disable popup button
    enabled ? popup.enable() : popup.disable();

    // set badge
    popup.setBadgeText({text: (badge || '').toString()});
    popup.setBadgeBackgroundColor({color: '#3d5afe'});
}

export default function () {
    userSubscribe('login', ({messages}) => setState(true, messages.unreadCount));
    userSubscribe('logout', ({messages}) => setState(false, messages.unreadCount));

    messagesSubscribe(state => setState(state.user.authorized, state.messages.unreadCount));
}
