import store from '../store';

const handlers = [];
let prevState;

store.subscribe(() => {
    const newState = store.getState();

    if (prevState && prevState.messages.unreadCount === newState.messages.unreadCount) {
        return;
    }

    prevState = newState;

    handlers.forEach(handler => handler(newState));
});

export default handler => handlers.push(handler);
