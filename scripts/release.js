const {execSync} = require('child_process');
const fs = require('fs-extra');

function updateVersion(newVersion) {
    const paths = [
        './package.json',
        './src/manifest.json'
    ];

    paths.forEach(path => {
        const config = fs.readJsonSync(path);
        config.version = newVersion;
        fs.writeJsonSync(path, config);
    });
}

function setTag(newVersion) {
    execSync(`git tag v${newVersion}`);
}

function validate(newVersion) {
    const semverRegex = /^\d+\.\d+\.\d+$/;

    if (!newVersion || !semverRegex.test(newVersion)) {
        throw new Error('The release version is not provided or is incorrect');
    }
}

const newVersion = process.argv[2];

validate(newVersion);

updateVersion(newVersion);
console.log(`Package version has been updated to ${newVersion}`);

setTag(newVersion);
console.log(`Tag has been set to v${newVersion}`);

