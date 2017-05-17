import {
    OPEN_LINK,
    OPEN_SETTINGS,
    RELOAD_APP,
} from 'shared/redux-consts/popup';
import * as runtimeUtils from '../../utils/runtime';
import * as tabUtils from '../../utils/tab';

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
    window.Raven.captureMessage('[Event] reload-extension-click', {level: 'info'});

    runtimeUtils.reloadApp();

    return {type: RELOAD_APP};
}

export function openDonationLink() {
    window.Raven.captureMessage('[Event] donate-click', {level: 'info'});

    return openLink({url: 'https://donorbox.org/alexander-ivantsov'});
}
