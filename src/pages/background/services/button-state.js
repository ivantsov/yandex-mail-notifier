import {subscribe} from 'redux-subscriber';
import openTab from 'shared/utils/tab';

const popup = chrome.browserAction;

function setState({user, messages}) {
    const enabled = user.authorized;
    const badge = (messages.unreadCount || '').toString();

    // enable or disable popup button (onClick works only if no popup set)
    if (enabled) {
        popup.setPopup({popup: 'pages/popup.html'});
        popup.setIcon({path: '/assets/icon.png'});
    }
    else {
        popup.setPopup({popup: ''});
        popup.setIcon({path: '/assets/icon-disabled.png'});
    }

    // set badge
    popup.setBadgeText({text: badge});
    popup.setBadgeBackgroundColor({color: '#3d5afe'});
}

export default function () {
    popup.onClicked.addListener(openTab);

    subscribe('user.authorized', setState);
    subscribe('messages.unreadCount', setState);
}
