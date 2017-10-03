import {createBackgroundStore} from 'redux-webext';
import {
  LOAD_MESSAGES,
  UPDATE_MESSAGE,
} from 'shared/redux-consts/messages';
import {
  OPEN_LINK,
  OPEN_SETTINGS,
  RELOAD_APP,
  OPEN_DONATION_LINK,
} from 'shared/redux-consts/popup';
import {UPDATE_SETTINGS} from 'shared/redux-consts/settings';
import store from './store';
import {
  loadMessages,
  updateMessage,
  invalidateMessages,
} from './actions/messages';
import {
  openLink,
  openSettings,
  reloadApp,
  openDonationLink,
} from './actions/popup';
import {updateSettings} from './actions/settings';

export default createBackgroundStore({
  store,
  actions: {
    [LOAD_MESSAGES]: loadMessages,
    [UPDATE_MESSAGE]: updateMessage,
    [OPEN_LINK]: openLink,
    [OPEN_SETTINGS]: openSettings,
    [RELOAD_APP]: reloadApp,
    [OPEN_DONATION_LINK]: openDonationLink,
    [UPDATE_SETTINGS]: updateSettings,
  },
  onDisconnect() {
    store.dispatch(invalidateMessages());
  },
});
