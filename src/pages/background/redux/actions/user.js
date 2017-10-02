import {LOGIN, LOGOUT} from 'shared/redux-consts/user';
import storage from '../../modules/storage';
import {loadUser} from '../../utils/api';

export function login() {
  return async (dispatch, getState) => {
    const {token} = getState().user;
    const data = await loadUser(token);

    if (token !== data.token) {
      storage.set('user', {token: data.token});
    }

    dispatch({
      type: LOGIN,
      data,
    });
  };
}

export function logout() {
  storage.remove('user');

  return {type: LOGOUT};
}
