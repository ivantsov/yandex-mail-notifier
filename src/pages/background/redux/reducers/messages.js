import {
  LOAD_MESSAGES_COUNT,
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
  UPDATE_MESSAGE,
  INVALIDATE_MESSAGES,
} from 'shared/redux-consts/messages';

const initialState = {
  unreadCount: 0,
  items: [],
  loading: true,
  error: false,
};

// Another one solution for loading is showing cached messages with
// "New messages are loading..." and then "Show new msgs" button (smth like Inbox by google)

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_MESSAGES_COUNT:
      return {
        ...state,
        unreadCount: action.data,
      };
    case LOAD_MESSAGES:
    case INVALIDATE_MESSAGES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        items: action.data,
        loading: false,
        error: false,
      };
    case LOAD_MESSAGES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_MESSAGE:
      // don't update unreadCount manually because it'll lead to race condition
      // e.g. we removed 5 messages at once but server handled only 3, we'll show user 10 - 5
      // but when we receive server response it'll be 10 - 3
      return {
        ...state,
        items: state.items.filter(({id}) => id !== action.id),
      };
    default:
      return state;
  }
}
