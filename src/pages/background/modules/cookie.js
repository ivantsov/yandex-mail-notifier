import store from '../redux/store';
import {login, logout} from '../redux/actions/user';
import {config} from '../utils/cookie';
import resolveUrl from '../utils/url-resolver';

export default function initCookieListener() {
    chrome.cookies.onChanged.addListener(({cookie, removed}) => {
        const {
            domain,
            name,
            path,
        } = cookie;

        if (domain.includes(resolveUrl(config.domain)) &&
            name === config.items.sessionId &&
            path === config.path
        ) {
            store.dispatch(removed ? logout() : login());
        }
    });
}
