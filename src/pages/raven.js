import Raven from 'raven-js';
import appConfig from 'shared/config';
import config from '../manifest/base.json';

Raven.config('https://de838c75714548c1b68ab1f14fa01e98@sentry.io/120928', {
  environment: __DEV__ ? 'development' : 'production',
  release: config.version,
  maxBreadcrumbs: 50,
  ignoreErrors: [
    appConfig.errors.offline,
    appConfig.errors.notAuthorized,
  ],
  shouldSendCallback() {
    return !window.navigator.userAgent.includes('Vivaldi');
  },
}).install();

window.onunhandledrejection = (err) => {
  Raven.captureException(err.reason);
};

// expose for background.js
window.Raven = Raven;
