import Raven from 'raven-js';
import errors from 'shared/errors';
import config from '../manifest.json';

Raven.config('https://a4bc742caec34db89cb376ce5d9c049d@sentry.io/120928', {
    release: config.version,
    ignoreErrors: [
        errors.OFFLINE,
        errors.NOT_AUTHORIZED
    ]
}).install();

window.onunhandledrejection = (err) => {
    Raven.captureException(err.reason);
};

// expose for background.js
window.Raven = Raven;
