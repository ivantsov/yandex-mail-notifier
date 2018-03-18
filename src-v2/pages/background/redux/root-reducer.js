import {combineReducers} from 'redux';
import {LOGOUT} from 'shared/redux-consts/user';
import user from './user/user.reducer';
import messages from './messages/messages.reducer';
import settings from './settings/settings.reducer';

const appReducer = combineReducers({
  user,
  messages,
  settings,
});

export default function (state, action) {
  // clear the whole state except settings on logout action
  const nextState = action.type === LOGOUT ? {settings: state.settings} : state;
  return appReducer(nextState, action);
}
