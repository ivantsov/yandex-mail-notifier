const baseManifest = require('./base.json');

module.exports = (target) => ({
  ...baseManifest,
  ...require(`./${target}`), // eslint-disable-line global-require, import/no-dynamic-require
});
