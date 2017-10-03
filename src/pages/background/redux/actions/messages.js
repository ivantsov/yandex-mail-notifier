import {
  LOAD_MESSAGES_COUNT,
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
  UPDATE_MESSAGE,
  INVALIDATE_MESSAGES,
} from 'shared/redux-consts/messages';
import {
  getMessages,
  getMessagesCount,
  updateMessageStatus,
} from '../../utils/api';

let popupIsOpen = false;

export function loadMessagesCount(data) {
  return async (dispatch) => {
    const unreadMessagesCount = data || await getMessagesCount();

    dispatch({
      type: LOAD_MESSAGES_COUNT,
      data: unreadMessagesCount,
    });
  };
}

export function loadMessages() {
  return async (dispatch) => {
    popupIsOpen = true;

    dispatch({type: LOAD_MESSAGES});

    try {
      const data = await getMessages();

      // to prevent rewriting "loading" value, we dispatch the action only if popup is open
      // "popupIsOpen" could be rewritten by "invalidateMessages" action
      if (popupIsOpen) {
        dispatch({
          type: LOAD_MESSAGES_SUCCESS,
          data,
        });
      }
    } catch (err) {
      dispatch({type: LOAD_MESSAGES_ERROR});

      // throw unhandled exception for raven
      throw err;
    }
  };
}

export function updateMessage({data}) {
  updateMessageStatus(data);

  // kind of optimistic update :)
  return {
    type: UPDATE_MESSAGE,
    id: data.id,
  };
}

export function invalidateMessages() {
  popupIsOpen = false;

  return {type: INVALIDATE_MESSAGES};
}
