import store from '../redux/store';
import {login, logout} from '../redux/actions/user';

const config = {
    domain: 'yandex',
    preferredDomain: 'yandex.ru',
    path: '/',
    items: {
        sessionId: 'Session_id',
        uid: 'yandexuid'
    }
};

let currentDomain;

function getCookieByName(name) {
    return new Promise(resolve => {
        chrome.cookies.getAll({
            path: config.path,
            name
        }, cookies => {
            let cookieValue;

            if (cookies && Array.isArray(cookies)) {
                const availableCookies = cookies.filter(({domain, value}) =>
                    domain.includes(currentDomain || config.domain) &&
                    !value.includes('noauth')
                );

                if (availableCookies.length) {
                    const cookie = availableCookies.find(({domain}) => domain.includes(config.preferredDomain)) || availableCookies[0];
                    currentDomain = cookie.domain;
                    cookieValue = cookie.value;
                }
            }

            resolve(cookieValue);
        });
    });
}

export function getUid() {
    return getCookieByName(config.items.uid);
}

export function getSessionId() {
    return getCookieByName(config.items.sessionId);
}

export function getCurrentDomain() {
    return currentDomain;
}

export function initCookieListener() {
    chrome.cookies.onChanged.addListener(({cookie, removed}) => {
        const {
            domain,
            name,
            path,
            value
        } = cookie;

        if (domain.includes(currentDomain || config.domain) &&
            name === config.items.sessionId &&
            path === config.path
        ) {
            if (removed || value.includes('noauth')) {
                currentDomain = null;
                store.dispatch(logout());
            }
            else {
                // if user logged in via another domain we should update it
                currentDomain = domain;
                store.dispatch(login());
            }
        }
    });
}
