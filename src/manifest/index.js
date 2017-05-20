const baseManifest = require('./base.json');

// eslint-disable-next-line global-require, import/no-dynamic-require
module.exports = (target) => Object.assign({}, baseManifest, require(`./${target}`));
