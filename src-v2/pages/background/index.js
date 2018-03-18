import {LOAD_STORAGE_DATA} from 'shared/redux-consts/meta';
import store from './redux/store';
import './redux/ext-store'; // init redux-webext store
import storage from './modules/storage';
import {login} from './redux/user/user.actions';
// import initWS from './modules/websocket';
import initNotification from './ui/notification';
import initButtonState from './ui/popup-button';

// TODO:
// 3) save user login, token, uid into local storage and reuse

async function loadStorageData() {
  const data = await storage.getAll();

  store.dispatch({
    type: LOAD_STORAGE_DATA,
    data,
  });
}

(async () => {
  // we should prepare the store before starting any service
  await loadStorageData();

  initNotification();
  initButtonState();

  store.dispatch(login());
})();
