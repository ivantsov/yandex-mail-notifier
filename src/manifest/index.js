const baseManifest = require('./base.json');

module.exports = target =>
  // eslint-disable-next-line global-require, import/no-dynamic-require
  Object.assign({}, baseManifest, require(`./${target}`));
