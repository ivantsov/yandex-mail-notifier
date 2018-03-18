import debounce from 'lodash.debounce';
import store from '../redux/store';
import {login, logout} from '../redux/actions/user';
import {config} from '../utils/cookie';
import resolveUrl from '../utils/url-resolver';

const handleCookieChange = debounce(({
  prevLogin,
  nextLogin,
  removed,
}) => {
  // user logged out from all accounts
  if (removed) {
    console.log('LOGOUT', prevLogin, nextLogin, removed);
    store.dispatch(logout());
    return;
  }

  // user just logged in for the first time
  if (!prevLogin && nextLogin) {
    console.log('LOGIN', prevLogin, nextLogin, removed);
    store.dispatch(login());
    return;
  }

  // user changed the account
  // prevLogin is the whole email address e.g. "user@ya.ru"
  // however nextLogin is only login name e.g. "user"
  if (!prevLogin.includes(nextLogin)) {
    console.log('ACCOUNT CHANGED', prevLogin, nextLogin, removed);
    store.dispatch(logout());
    store.dispatch(login());
    return;
  }

  console.log('SOMETHING ELSE', prevLogin, nextLogin, removed);
}, 300);

export default function initCookieListener() {
  chrome.cookies.onChanged.addListener(({cookie, removed}) => {
    const {
      domain,
      name,
      value,
      path,
    } = cookie;

    if (domain.includes(resolveUrl(config.domain)) &&
            name === config.items.login &&
            path === config.path
    ) {
      handleCookieChange({
        prevLogin: store.getState().user.email,
        nextLogin: value,
        removed,
      });
    }
  });
}
