import {LOAD_STORAGE_DATA} from 'shared/redux-consts/meta';
import {LOGIN} from 'shared/redux-consts/user';

const initialState = {
    authorized: false,
    email: null,
    token: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_STORAGE_DATA:
            return {
                ...state,
                ...action.data.user,
            };
        case LOGIN:
            return {
                ...state,
                authorized: true,
                email: action.data || state.email, // in case when we already have email
            };
        default:
            return state;
    }
}
