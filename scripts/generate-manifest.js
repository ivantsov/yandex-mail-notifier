const fs = require('fs-extra');
const getManifest = require('../src/manifest');

const target = process.argv[2];

fs.outputJsonSync('./dist/manifest.json', getManifest(target));

console.log('Manifest is generated.');
