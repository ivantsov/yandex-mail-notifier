Yandex.Mail notifier for Chrome
===============================

[![Build Status](https://travis-ci.org/ivantsov/yandex-mail-notifier-chrome.svg?branch=master)](https://travis-ci.org/ivantsov/yandex-mail-notifier-chrome)
[![codecov](https://codecov.io/gh/ivantsov/yandex-mail-notifier-chrome/branch/master/graph/badge.svg)](https://codecov.io/gh/ivantsov/yandex-mail-notifier-chrome)

# Important
One day this repo will be merged to https://github.com/ivantsov/yandex-mail-notifier, because Firefox is going to support WebExtensions API - https://developer.mozilla.org/en-US/Add-ons/WebExtensions. So that we can reuse common parts of the extension and merged these two repos.

## Install

This project uses [Yarn](https://yarnpkg.com), to install dependencies - run `yarn`.

## Development

#### Common

* `npm run lint` - runs eslint
* `npm run lint:fix` - runs eslint in autofix mode
* `npm run test` - runs tests
* `npm run test:watch` - runs tests in watch mode
* `npm run test:coverage` - runs tests with coverage report

#### Chrome

Just run `npm run start:chrome` to start development server.

#### Firefox

1. Run `npm run watch:firefox` to build the bundle in watch mode.
2. Run `npm run start:firefox` to start development server.

## Release

1. Make sure you're on `master` branch.
2. Run `npm run release <version>` (e.g. `npm run release 2.1.3`). It will update version in `manifest.json` and `package.json` files, set the tag according to the version and commit these changes.
3. Check the changes carefully and push.
4. The following steps depend on the browser.

#### Chrome

After the push, TravisCI will take care of uploading and publishing new version to Chrome Store.

#### Firefox

1. Run `build:firefox` to build the bundle for FF.
2. Run `npm run zip` to get an archive.
3. Upload the archive to [AMO](https://addons.mozilla.org/en-US/developers/addon/yandex-mail-notifier/versions/submit/).

## Sponsors

Thanks to the sponsors for supporting this project!
<p>
  <a href="https://sentry.io">
    <img src="https://a0wx592cvgzripj.global.ssl.fastly.net/_static/7973ff08ea346f79c425e4738ebd7663/getsentry/images/branding/svg/sentry-horizontal-black.svg" alt="Sentry Logo" width="130"/>
  </a>
</p>
