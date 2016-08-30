const locales = require('./locales');

locales({
    inputDir: './src/locales',
    outputDir: './dist/_locales'
}).then(() => console.log('Locales are generated.'));
