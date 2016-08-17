const path = require('path');
const fs = require('fs-extra');

function flatMap(src, prevKey = '') {
    let result = {};

    if (typeof src === 'object') {
        Object.keys(src).forEach(key => {
            const nextKey = `${prevKey ? `${prevKey}_` : ''}${key}`;

            Object.assign(result, flatMap(src[key], nextKey));
        });
    }
    else if (typeof src === 'string'){
        result = {
            [prevKey]: {message: src}
        };
    }

    return result;
}

const srcDir = path.resolve('./src/locales');
const distDir = path.resolve('./dist/_locales');
const files = fs.readdirSync(srcDir);

files.forEach(filename => {
    const localeName = path.basename(filename, '.js');
    const localeFile = require(path.join(srcDir, filename));
    const localePath = path.join(distDir, localeName);

    fs.outputJSONSync(path.join(localePath, 'messages.json'), flatMap(localeFile));
});

console.log('Generating locales is finished');
