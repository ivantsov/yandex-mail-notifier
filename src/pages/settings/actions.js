import {UPDATE_SETTINGS} from 'shared/redux-consts/settings';

// eslint-disable-next-line import/prefer-default-export
export function updateSettings(name, value) {
  return {
    type: UPDATE_SETTINGS,
    [name]: value,
  };
}
