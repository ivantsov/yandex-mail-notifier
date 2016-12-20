// comes from raven.js
const {Raven} = window;

export default store => next => action => {
    try {
        Raven.captureBreadcrumb({
            category: 'redux',
            message: action.type
        });

        return next(action);
    } catch (err) {
        Raven.captureException(err, {
            extra: {
                action,
                state: store.getState()
            }
        });
    }
}
