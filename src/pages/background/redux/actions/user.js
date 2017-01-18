import {LOGIN, LOGOUT} from 'shared/redux-consts/user';
import {getUser} from '../../utils/api';

export function login() {
    return async (dispatch, getState) => {
        const action = {type: LOGIN};

        // we need to load user data only once, because it can only change after logout
        if (!getState().user.email) {
            action.data = await getUser();
        }

        dispatch(action);
    };
}

export function logout() {
    return {type: LOGOUT};
}
