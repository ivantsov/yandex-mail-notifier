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
} from './messages/messages.actions';
import {
  openLink,
  openSettings,
  reloadApp,
  openDonationLink,
} from './popup/popup.actions';
import {updateSettings} from './settings/settings.actions';

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
