const i18n = require('webext-i18n');

i18n({
  inputDir: './src/locales',
  outputDir: './dist/_locales',
}).then(() => console.log('Locales are generated.'));
