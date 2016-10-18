import {LOGIN} from 'shared/redux-consts/user';

const initialState = {
    authorized: false,
    email: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                authorized: true,
                email: action.data || state.email // in case when we already have email
            };
        default:
            return state;
    }
}
