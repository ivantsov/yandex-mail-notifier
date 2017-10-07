import request from 'superagent';
import appConfig from 'shared/config';
import {
  getUid as getCookieUid,
  getSessionId,
} from './cookie';
import resolveUrl from './url-resolver';
import parseXML from './parser';

const API_URL = 'https://mail.yandex.{domain}/api';
const AUTH_CONFIG = {
  tokenUrl: 'https://oauth.yandex.{domain}/token',
  passportUrl: 'https://pass.yandex.{domain}/accounts',
  clientId: '49c545918c574ac28dd7d27e8297065a',
  clientSecret: '813caaea334a4fb5be54a8b9af3f4c97',
};

// prevent sending 'Origin' header, otherwise yandex doesn't execute an operation
chrome.webRequest.onBeforeSendHeaders.addListener(({requestHeaders}) => ({
  requestHeaders: requestHeaders.filter(({name}) => name !== 'Origin'),
}), {
  urls: appConfig.supportedDomains.map(domain => `${API_URL}/*`.replace('{domain}', domain)),
}, ['blocking', 'requestHeaders']);

async function sendRequest(data) {
  const {
    method = 'get',
    url,
    type = 'json',
    form,
    query,
  } = data;

  const res = await request(method, url)
    .type(form ? 'form' : 'json')
    .send(form)
    .query(query);

    // json
  if (type === 'json') {
    const resData = res.body || JSON.parse(res.text);

    if (resData.code === appConfig.errors.notAuthorized) {
      throw new Error(appConfig.errors.notAuthorized);
    }

    return resData;
  }

  // xml
  const {responseXML} = res.xhr;

  if (!responseXML) {
    throw new Error(`No XML in the response: ${res.text}`);
  }

  // sometimes Yandex sends "redirect" instead of result, so we need just follow that url in response
  // check on "redirect_to" should be before "error", because "redirect_to" response contains "error" as well
  const redirect = responseXML.querySelector('redirect_to');
  if (redirect) {
    return sendRequest({
      ...data,
      url: redirect.textContent,
    });
  }

  const err = responseXML.querySelector('error');
  if (err) {
    const errText = err.textContent || err.getAttribute('code');
    throw new Error(`Error in the response: ${errText}`);
  }

  return res.xhr.responseXML;
}

async function loadUserInfo() {
  const cookieUid = await getCookieUid();
  if (!cookieUid) {
    throw new Error(appConfig.errors.notAuthorized);
  }

  const {
    default_uid: uid,
    accounts,
  } = await sendRequest({
    url: resolveUrl(AUTH_CONFIG.passportUrl),
    query: {
      yu: cookieUid,
    },
  });

  if (!accounts) {
    throw new Error(appConfig.errors.notAuthorized);
  }

  const user = accounts.find(item => item.uid === uid);

  return {
    uid,
    email: user.defaultEmail,
  };
}

async function loadToken(uid) {
  const sessionId = await getSessionId();
  const res = await sendRequest({
    method: 'post',
    url: resolveUrl(AUTH_CONFIG.tokenUrl),
    form: {
      grant_type: 'sessionid',
      host: resolveUrl('yandex.{domain}'),
      client_id: AUTH_CONFIG.clientId,
      client_secret: AUTH_CONFIG.clientSecret,
      sessionid: sessionId,
      uid,
    },
  });

  return res.access_token;
}

export async function loadUser(token) {
  const userInfo = await loadUserInfo();

  return {
    ...userInfo,
    token: token || await loadToken(userInfo.uid),
  };
}

export async function getMessagesCount() {
  const res = await sendRequest({
    url: resolveUrl(`${API_URL}/v2/bar/counters`),
    query: {silent: true},
  });

  if (!res.counters) {
    throw new Error(res);
  }

  return res.counters.unread;
}

export async function getMessages() {
  const res = await sendRequest({
    url: resolveUrl(`${API_URL}/mailbox_list`),
    type: 'xml',
    query: {
      first: 0,
      last: 100,
      extra_cond: 'only_new',
      goto: 'all',
    },
  });

  return parseXML(res);
}

export function updateMessageStatus({oper, id}) {
  return sendRequest({
    method: 'post',
    url: resolveUrl(`${API_URL}/mailbox_oper`),
    type: 'xml',
    form: {
      ids: [id],
      oper,
    },
  });
}
