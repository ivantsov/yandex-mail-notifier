import {
    LOAD_MESSAGES,
    UPDATE_MESSAGE,
} from 'shared/redux-consts/messages';
import {
    OPEN_LINK,
    OPEN_SETTINGS,
    RELOAD_APP,
    OPEN_DONATION_LINK,
} from 'shared/redux-consts/popup';

export function loadMessages(log) {
    return {
        type: LOAD_MESSAGES,
        log,
    };
}

export function updateMessage(data) {
    return {
        type: UPDATE_MESSAGE,
        data,
    };
}

export function openLink(url) {
    return {
        type: OPEN_LINK,
        url,
    };
}

export function openSettings() {
    return {type: OPEN_SETTINGS};
}

export function reloadApp() {
    return {type: RELOAD_APP};
}

export function openDonationLink() {
    return {type: OPEN_DONATION_LINK};
}
