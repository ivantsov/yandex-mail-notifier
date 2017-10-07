import resolveUrl from './url-resolver';

export const config = {
  domain: '.yandex.{domain}',
  path: '/',
  items: {
    login: 'yandex_login',
    sessionId: 'Session_id',
    uid: 'yandexuid',
  },
};

function getCookieByName(name) {
  return new Promise(resolve => {
    chrome.cookies.getAll({
      domain: resolveUrl(config.domain),
      path: config.path,
      name,
    }, res => {
      resolve(
        Array.isArray(res) &&
                res[0] &&
                res[0].value,
      );
    });
  });
}

export function getUid() {
  return getCookieByName(config.items.uid);
}

export function getSessionId() {
  return getCookieByName(config.items.sessionId);
}
