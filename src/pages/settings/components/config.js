import types from './field/types';

const fiveMin = 5 * 60 * 1000;

// TODO: use i18n
// TODO: use description field
export default [{
    type: types.select,
    name: 'newMessageNotification',
    label: 'Notify when new email is received',
    options: [{
        value: 0,
        label: 'off'
    }, {
        value: 1,
        label: 'desktop notification'
    }, {
        value: 2,
        label: 'desktop + sound notification'
    }]
}, {
    type: types.select,
    name: 'unreadMessagesNotification',
    label: 'Remind about unread emails via desktop notification',
    options: [{
        value: 0,
        label: 'off'
    }, {
        value: fiveMin,
        label: 'every 5 min'
    }, {
        value: 3 * fiveMin,
        label: 'every 15 min'
    }, {
        value: 6 * fiveMin,
        label: 'every 30 min'
    }]
}, {
    type: types.checkbox,
    name: 'unreadMessagesSound',
    label: 'Remind about unread emails via sound notification',
    description: 'Plays according to the reminder interval.'
}, {
    type: types.select,
    name: 'notAuthNotification',
    label: 'Notify if you\'re not logged in',
    description: 'Every 5 min',
    options: [{
        value: 0,
        label: 'off'
    }, {
        value: 1,
        label: 'desktop notification'
    }, {
        value: 2,
        label: 'desktop + sound notification'
    }]
}];
