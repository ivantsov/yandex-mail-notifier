module.exports = {
    ext: {
        name: 'Yandex.Mail notifier',
        description: 'Tunable notifier for Yandex.Mail, lots of options, no need to enter your credentials.'
    },
    notification: {
        unread: {
            title: 'You have unread emails',
            message: 'Unread emails: $1'
        },
        notAuth: {
            title: 'You\'re not authorized',
            message: 'Please, log in into your Yandex account'
        }
    },
    popup: {
        title: 'Yandex.Mail notifier',
        compose: 'Compose',
        actions: {
            open: 'Open',
            read: 'Mark as read',
            spam: 'Spam',
            remove: 'Remove'
        },
        emptyList: 'You have no unread emails',
        loadingError: 'Cannot load emails... Please try again later',
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
    },
    settings: {
        newMessageNotification: {
            label: 'Notify when new email is received',
            options: [
                'off',
                'desktop notification',
                'desktop & sound notification'
            ]
        },
        unreadMessagesNotification: {
            label: 'Remind about unread emails via desktop notification',
            options: [
                'off',
                'every 5 min',
                'every 15 min',
                'every 30 min'
            ]
        },
        unreadMessagesSound: {
            label: 'Remind about unread emails via sound notification',
            description: 'Plays according to the reminder interval'
        },
        notAuthNotification: {
            label: 'Notify if you\'re not logged in',
            description: 'Every 5 min',
            options: [
                'off',
                'desktop notification',
                'desktop & sound notification'
            ]
        }
    }
};