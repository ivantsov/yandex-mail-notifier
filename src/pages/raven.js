import Raven from 'raven-js';
import appConfig from 'shared/config';
import config from '../manifest/base.json';

Raven.config('https://a4bc742caec34db89cb376ce5d9c049d@sentry.io/120928', {
    environment: __DEV__ ? 'development' : 'production',
    release: config.version,
    maxBreadcrumbs: 50,
    ignoreErrors: [
        appConfig.errors.offline,
        appConfig.errors.notAuthorized,
    ],
}).install();

window.onunhandledrejection = (err) => {
    Raven.captureException(err.reason);
};

// expose for background.js
window.Raven = Raven;
