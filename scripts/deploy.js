const request = require('superagent');

const filename = './dist/yandex-mail-notifier.zip';
const appId = process.env.APP_ID;
const clientId = process.env.CLIENT_ID;
const refreshToken = process.env.REFRESH_TOKEN;

function getError(text, err) {
  throw new Error(`Failed to ${text}: ${(err.response && err.response.text) || err}`);
}

function getToken() {
  return request
    .post('https://accounts.google.com/o/oauth2/token')
    .type('form')
    .send({
      client_id: clientId,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
      redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
    })
    .then(res => {
      const accessToken = res.body.access_token;

      if (!accessToken) {
        throw new Error(res.body);
      }

      console.log('(1/3) Token received!');

      return accessToken;
    })
    .catch(err => getError('receive access token', err));
}

function upload(accessToken) {
  return request
    .put(`https://www.googleapis.com/upload/chromewebstore/v1.1/items/${appId}`)
    .set({
      Authorization: `Bearer ${accessToken}`,
      'x-goog-api-version': 2,
    })
    .attach('file', filename)
    .then(res => {
      if (res.body.uploadState !== 'SUCCESS') {
        throw new Error(res.body.itemError[0].error_detail);
      }

      console.log('(2/3) Uploaded!');

      return accessToken;
    })
    .catch(err => getError('upload package', err));
}

function publish(accessToken) {
  return request
    .post(`https://www.googleapis.com/chromewebstore/v1.1/items/${appId}/publish`)
    .set({
      Authorization: `Bearer ${accessToken}`,
      'x-goog-api-version': 2,
      'Content-Length': 0,
      // publishTarget: 'trustedTesters'
    })
    .then(res => {
      if (res.body.status[0] !== 'OK') {
        throw new Error(res.body);
      }

      console.log('(3/3) Published!');
    })
    .catch(err => getError('publish package', err));
}

getToken()
  .then(upload)
  .then(publish)
  .catch(console.log);
