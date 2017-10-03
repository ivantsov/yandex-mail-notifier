import {LOAD_STORAGE_DATA} from 'shared/redux-consts/meta';
import store from './redux/store';
import './redux/ext-store'; // init redux-webext store
import {login} from './redux/actions/user';
import storage from './modules/storage';
import initWS from './modules/websocket';
import initCookieListener from './modules/cookie';
import initNotification from './modules/notification';
import initButtonState from './modules/popup-button';

async function loadStorageData() {
  const data = await storage.getAll();

  store.dispatch({
    type: LOAD_STORAGE_DATA,
    data,
  });
}

function initModules() {
  initWS();
  initCookieListener();
  initNotification();
  initButtonState();
}

(async () => {
  // we should prepare the store before starting any service
  await loadStorageData();

  initModules();

  store.dispatch(login());
})();
