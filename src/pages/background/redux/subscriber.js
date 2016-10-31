import {get} from 'object-path';
import store from './store';

let prevState;

const subscribers = {};

store.subscribe(() => {
    const newState = store.getState();

    Object.keys(subscribers).forEach(key => {
        if (get(prevState, key) !== get(newState, key)) {
            subscribers[key].forEach(cb => cb(newState));
        }
    });

    prevState = newState;
});

export function subscribe(key, cb) {
    if (subscribers.hasOwnProperty(key)) {
        subscribers[key].push(cb);
    }
    else {
        subscribers[key] = [cb];
    }
}
