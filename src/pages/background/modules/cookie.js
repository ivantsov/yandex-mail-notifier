import store from '../redux/store';
import {login, logout} from '../redux/actions/user';

const config = {
    domain: '.yandex.ru',
    path: '/',
    items: {
        sessionId: 'Session_id',
        uid: 'yandexuid',
    },
};

let currentDomain;

function getCookieByName(name) {
    return new Promise(resolve => {
        chrome.cookies.getAll({
            domain: config.domain,
            path: config.path,
            name,
        }, res => {
            if (chrome.runtime.lastError) {
                throw new Error(`Last error in cookie ${chrome.runtime.lastError.message}`);
            }

            resolve(
                Array.isArray(res) &&
                res[0] &&
                res[0].value,
            );
        });
    });
}

export function getUid() {
    return getCookieByName(config.items.uid);
}

export function getSessionId() {
    return getCookieByName(config.items.sessionId);
}

export function initCookieListener() {
    chrome.cookies.onChanged.addListener(({cookie, removed}) => {
        const {
            domain,
            name,
            path,
        } = cookie;

        if (domain.includes(currentDomain || config.domain) &&
            name === config.items.sessionId &&
            path === config.path
        ) {
            store.dispatch(removed ? logout() : login());
        }
    });
}
