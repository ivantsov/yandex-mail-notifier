import {combineReducers} from 'redux';
import {LOGOUT} from 'shared/redux-consts/user';
import user from './user';
import messages from './messages';
import settings from './settings';

const appReducer = combineReducers({
    user,
    messages,
    settings
});

export default function (state, action) {
    if (action.type === LOGOUT) {
        // clear the whole state except settings
        state = {
            settings: state.settings
        };
    }

    return appReducer(state, action);
}
