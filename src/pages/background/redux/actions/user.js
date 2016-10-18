import {LOGIN, LOGOUT} from 'shared/redux-consts/user';
import store from '../store';
import {getUser} from '../../utils/api';

export async function login() {
    const action = {type: LOGIN};

    // we need to load user data only once, because it can only change after logout
    if (!store.getState().user.email) {
        action.data = await getUser();
    }

    store.dispatch(action);
}

export function logout() {
    store.dispatch({type: LOGOUT});
}

