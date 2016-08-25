import store from '../store';

const handlers = {
    unreadMessagesNotification: [],
    notAuthNotification: []
};
let prevState;

function emit(event, newState) {
    handlers[event].forEach(h => h(newState));
}

store.subscribe(() => {
    const newState = store.getState();

    if (!prevState) {
        Object.keys(handlers).forEach(key => emit(key, newState));
        return;
    }
    else if (prevState.settings === newState.settings) {
        return;
    }

    if (prevState.settings.unreadMessagesNotification !== newState.settings.unreadMessagesNotification) {
        emit('unreadMessagesNotification');
    }
    else if (prevState.settings.notAuthNotification !== newState.settings.notAuthNotification) {
        emit('notAuthNotification');
    }

    prevState = newState;
});

export default (event, handler) => handlers[event].push(handler);
