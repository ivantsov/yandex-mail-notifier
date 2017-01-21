import 'babel-polyfill';
import store from './redux/store';
import {login, logout} from './redux/actions/user';
import {loadSettings} from './redux/actions/settings';
import {initCookieListener, getSessionId} from './services/cookie';
import initWS from './services/websocket';
import initButtonState from './services/button-state';
import initNotification from './services/notification';

async function initApp() {
    const {dispatch} = store;
    const isAuth = await getSessionId();

    // we should load settings before starting notification service and login/logout actions
    await dispatch(loadSettings());
    initNotification();

    dispatch(isAuth ? login() : logout());
}

initCookieListener();
initWS();
initButtonState();

initApp();
