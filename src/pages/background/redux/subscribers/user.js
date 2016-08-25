import store from '../store';

const handlers = {
    login: [],
    logout: []
};
let prevState;

store.subscribe(() => {
    const newState = store.getState();

    if (prevState && prevState.user.authorized === newState.user.authorized) {
        return;
    }

    prevState = newState;

    const event = newState.user.authorized ? 'login' : 'logout';
    handlers[event].forEach(handler => handler(newState));
});

export default (event, handler) => handlers[event].push(handler);
