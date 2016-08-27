const path = require('path');
const fs = require('fs-extra');
const sharp = require('sharp');

function resize({
    inputFile,
    outputDir,
    sizes = [16, 19, 32, 38, 48, 128]
}) {
    if (typeof inputFile !== 'string') {
        throw new Error('Expected the "inputFile" to be a string.');
    }

    if (typeof outputDir !== 'string') {
        throw new Error('Expected the "outputDir" to be a string.');
    }

    if (!Array.isArray(sizes)) {
        throw new Error('Expected the "sizes" to be an array.');
    }

    fs.ensureDirSync(outputDir);

    return Promise.all(sizes.map(size =>
        sharp(inputFile)
            .resize(size)
            .toFile(path.resolve(outputDir, `${size}.png`))
    ));
}

module.exports = resize;
