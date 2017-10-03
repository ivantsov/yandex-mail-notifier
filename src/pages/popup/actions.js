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

// only FF needs it
function closePopup() {
  window.close();
}

export function loadMessages() {
  return {type: LOAD_MESSAGES};
}

export function updateMessage(data) {
  return {
    type: UPDATE_MESSAGE,
    data,
  };
}

export function openLink(url) {
  closePopup();

  return {
    type: OPEN_LINK,
    url,
  };
}

export function openSettings() {
  closePopup();

  return {type: OPEN_SETTINGS};
}

export function reloadApp() {
  return {type: RELOAD_APP};
}

export function openDonationLink() {
  closePopup();

  return {type: OPEN_DONATION_LINK};
}
