const {execSync} = require('child_process');
const fs = require('fs-extra');

const paths = [
  './package.json',
  './src/manifest/base.json',
];

function validate(newVersion) {
  const semverRegex = /^\d+\.\d+\.\d+$/;

  if (!newVersion || !semverRegex.test(newVersion)) {
    throw new Error('The release version is not provided or incorrect');
  }
}

function updateVersion(newVersion) {
  paths.forEach(path => {
    const config = fs.readJsonSync(path);
    config.version = newVersion;
    fs.writeJsonSync(path, config, {spaces: 2});
  });
}

function makeCommit(newVersion) {
  execSync(`git add ${paths.join(' ')}`);
  execSync(`git commit -m "bump v${newVersion}" --no-verify`);
  execSync(`git tag v${newVersion}`);
}

const newVersion = process.argv[2];

validate(newVersion);

updateVersion(newVersion);
console.log(`Package version has been updated to ${newVersion}`);

makeCommit(newVersion);
console.log(`Tag has been set to v${newVersion}`);
