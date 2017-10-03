// comes from raven.js
const {Raven} = window;

let state, lastAction;

window.onunhandledrejection = (err) => {
  Raven.captureException(err.reason, {
    extra: {
      lastAction,
      state,
    },
  });
};

// eslint-disable-next-line consistent-return
export default store => next => action => {
  // save this data for unhandled exceptions
  state = store.getState();
  lastAction = action;

  Raven.captureBreadcrumb({
    category: 'redux',
    message: JSON.stringify(action),
  });

  return next(action);
};
