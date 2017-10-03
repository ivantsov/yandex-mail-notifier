import appConfig from 'shared/config';
import {LOAD_STORAGE_DATA} from 'shared/redux-consts/meta';
import {UPDATE_SETTINGS} from 'shared/redux-consts/settings';

const initialState = {
  newMessageNotification: 1, // only desktop notification
  unreadMessagesNotification: 5, // 5 min
  unreadMessagesSound: false,
  notAuthNotification: 1, // only desktop notification
  preferredDomain: appConfig.supportedDomains[0],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_STORAGE_DATA:
      return {
        ...state,
        ...action.data.settings,
      };
    case UPDATE_SETTINGS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
