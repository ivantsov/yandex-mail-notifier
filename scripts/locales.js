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
    else if (typeof src === 'string') {
        result = {
            [prevKey]: {message: src}
        };
    }

    return result;
}

function generate({inputDir, outputDir}) {
    if (typeof inputDir !== 'string') {
        throw new Error('Expected the "inputDir" to be a string.');
    }

    if (typeof outputDir !== 'string') {
        throw new Error('Expected the "outputDir" to be a string.');
    }

    const srcDir = path.resolve(inputDir);
    const distDir = path.resolve(outputDir);
    const files = fs.readdirSync(srcDir);

    return new Promise(resolve => {
        files.forEach(filename => {
            const localeName = path.basename(filename, '.js');
            const localeFile = require(path.join(srcDir, filename));
            const localePath = path.join(distDir, localeName);

            fs.outputJSONSync(path.join(localePath, 'messages.json'), flatMap(localeFile));
        });

        resolve();
    });
}

module.exports = generate;
