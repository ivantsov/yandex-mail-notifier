import resolveUrl from './url-resolver';

const {runtime, cookies} = chrome;

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
    cookies.getAll(
      {
        domain: resolveUrl(config.domain),
        path: config.path,
        name,
      },
      res => {
        if (runtime.lastError) {
          throw new Error(`Last error in cookie ${runtime.lastError.message}`);
        }

        resolve(Array.isArray(res) && res[0] && res[0].value);
      },
    );
  });
}

export function getUid() {
  return getCookieByName(config.items.uid);
}

export function getSessionId() {
  return getCookieByName(config.items.sessionId);
}
