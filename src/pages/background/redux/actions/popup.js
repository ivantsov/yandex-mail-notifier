import {
    OPEN_LINK,
    OPEN_SETTINGS,
    RELOAD_APP,
} from 'shared/redux-consts/popup';
import * as tabUtils from '../../utils/tab';
import * as runtimeUtils from '../../utils/runtime';

export function openLink({url} = {}) {
    tabUtils.openUrl(url);

    return {type: OPEN_LINK};
}

export function openSettings() {
    window.Raven.captureMessage('[Event] open-settings-click', {level: 'info'});

    tabUtils.openSettings();

    return {type: OPEN_SETTINGS};
}

export function reloadApp() {
    runtimeUtils.reloadApp();

    return {type: RELOAD_APP};
}

export function openDonationLink() {
    return openLink({url: 'https://donorbox.org/alexander-ivantsov'});
}
