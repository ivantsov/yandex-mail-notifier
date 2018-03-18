module.exports = {
  ext: {
    name: 'Yandex.Mail notifier',
    description: 'Tunable notifier for Yandex.Mail',
  },
  notification: {
    unread: {
      title: 'You have unread emails',
      message: 'Unread emails: $1',
    },
    notAuth: {
      title: 'You\'re not authorized',
      message: 'Please, log in into your Yandex account',
    },
  },
  popup: {
    title: 'Yandex.Mail notifier',
    compose: 'Compose',
    actions: {
      open: 'Open',
      read: 'Mark as read',
      spam: 'Spam',
      remove: 'Remove',
    },
    emptyList: 'You have no unread emails',
    loadingError: 'Cannot load emails... Please try again later',
    unavailable: {
      title: 'Something went wrong...',
      subTitle: 'There are a few possible reasons why the extension may not work properly:',
      notAuth: {
        label: 'You are not authorized.',
        checkAuth: 'Check that you\'re authorized on Yandex (exactly <strong>.$1</strong> domain). Also you can choose another domain in the extension settings.',
        relogin: 'Try to logout and login again.',
      },
      noConnection: {
        label: 'There is no connection to the Internet.',
      },
      nothingHelped: 'If nothing above helped, you can try to reload the extension.',
      reloadBtn: 'Reload extension',
    },
    donation: {
      text: 'Want more settings, new features and just stable work of the extension?',
      donateBtn: 'Support the project!',
    },
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
      'December',
    ],
  },
  settings: {
    newMessageNotification: {
      label: 'Notify when new email is received',
      options: [
        'off',
        'desktop notification',
        'desktop & sound notification',
      ],
    },
    unreadMessagesNotification: {
      label: 'Remind about unread emails via desktop notification',
      options: [
        'off',
        'every 5 min',
        'every 15 min',
        'every 30 min',
      ],
    },
    unreadMessagesSound: {
      label: 'Remind about unread emails via sound notification',
      description: 'Plays according to the reminder interval',
    },
    notAuthNotification: {
      label: 'Notify if you\'re not logged in',
      description: 'Every 5 min',
      options: [
        'off',
        'desktop notification',
        'desktop & sound notification',
      ],
    },
    setShortcuts: {
      label: 'Shortcuts',
      linkText: 'edit',
    },
    preferredDomain: {
      label: 'Preferred domain',
      description: 'Will be used for authorization, links etc',
      options: [
        'ru',
        'ua',
        'by',
        'kz',
        'com',
        'com.tr',
      ],
    },
  },
};
