import {combineReducers} from 'redux';
import {LOGOUT} from 'shared/redux-consts/user';
import user from './user';
import messages from './messages';
import settings from './settings';

const appReducer = combineReducers({
  user,
  messages,
  settings,
});

export default function (state, action) {
  // clear the whole state except settings on logout action
  const nextState = action.type === LOGOUT ?
    {settings: state.settings} :
    state;

  return appReducer(nextState, action);
}
