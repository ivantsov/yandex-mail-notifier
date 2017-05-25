import request from 'superagent';
import errors from 'shared/errors';
import {getUid as getCookieUid, getSessionId} from '../modules/cookie';
import parseXML from './parser';

const DOMAIN = 'https://mail.yandex.ru';
const API_URL = `${DOMAIN}/api`;
const AUTH_CONFIG = {
    tokenUrl: 'https://oauth.yandex.ru/token',
    passportUrl: 'https://pass.yandex.ru/accounts',
    clientId: '49c545918c574ac28dd7d27e8297065a',
    clientSecret: '813caaea334a4fb5be54a8b9af3f4c97',
};

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

        if (resData.code === errors.NOT_AUTHORIZED) {
            throw new Error(errors.NOT_AUTHORIZED);
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

export async function getUser() {
    const res = await sendRequest({
        url: `${API_URL}/settings_setup`,
        type: 'xml',
    });

    return res.querySelector('body').querySelector('default_email').textContent;
}

export async function getMessagesCount() {
    const res = await sendRequest({
        url: `${API_URL}/v2/bar/counters`,
        query: {silent: true},
    });

    if (!res.counters) {
        throw new Error(res);
    }

    return res.counters.unread;
}

async function getUid() {
    const uid = await getCookieUid();
    const res = await sendRequest({
        url: AUTH_CONFIG.passportUrl,
        query: {
            yu: uid,
        },
    });

    return res.default_uid;
}

async function getToken(uid) {
    const sessionId = await getSessionId();

    const res = await sendRequest({
        method: 'post',
        url: AUTH_CONFIG.tokenUrl,
        form: {
            grant_type: 'sessionid',
            host: 'yandex.ru',
            client_id: AUTH_CONFIG.clientId,
            client_secret: AUTH_CONFIG.clientSecret,
            sessionid: sessionId,
            uid,
        },
    });

    return res.access_token;
}

export async function getSocketCredentials() {
    const uid = await getUid();
    const token = await getToken(uid);

    return {
        uid,
        token,
    };
}

export async function getMessages() {
    const res = await sendRequest({
        url: `${API_URL}/mailbox_list`,
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
        url: `${API_URL}/mailbox_oper`,
        type: 'xml',
        form: {
            ids: [id],
            oper,
        },
    });
}
