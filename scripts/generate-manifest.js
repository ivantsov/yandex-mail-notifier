const fs = require('fs-extra');
const getManifest = require('../src/manifest');

const target = process.argv[2];

fs.outputJsonSync('./dist/manifest.json', getManifest(target), {spaces: 2});

console.log('Manifest is generated.');
