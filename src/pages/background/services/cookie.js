import {login, logout} from '../redux/actions/user';

const config = {
    domain: '.yandex.ru',
    path: '/',
    items: {
        sessionId: 'Session_id',
        uid: 'yandexuid'
    }
};

function getCookieByName(name) {
    return new Promise(resolve => {
        chrome.cookies.getAll({
            domain: config.domain,
            path: config.path,
            name
        }, res => resolve(res[0] && res[0].value));
    });
}

export function getUid() {
    return getCookieByName(config.items.uid);
}

export function getSessionId() {
    return getCookieByName(config.items.sessionId);
}

// TODO: check that the listener works on ya.ru/yandex.tr etc
export function initCookieListener() {
    chrome.cookies.onChanged.addListener(({cookie, removed}) => {
        const {
            domain,
            name,
            path
        } = cookie;

        if (domain === config.domain &&
            name === config.items.sessionId &&
            path === config.path
        ) {
            removed ? logout() : login();
        }
    });
}
