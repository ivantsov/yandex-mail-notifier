import request from 'superagent';
import parseXML from './parser';

const DOMAIN = 'https://mail.yandex.ru';
const API_URL = `${DOMAIN}/api`;

// prevent sending 'Origin' header
// otherwise yandex doesn't execute an operation
chrome.webRequest.onBeforeSendHeaders.addListener(({requestHeaders}) => ({
    requestHeaders: requestHeaders.filter(({name}) => name !== 'Origin')
}), {urls: [`${API_URL}/*`]}, ["blocking", "requestHeaders"]);

async function sendRequest(data) {
    const {
        method = 'get',
        url,
        type = 'json',
        form,
        query
    } = data;

    const res = await request(method, url)
        .type(form ? 'form' : 'json')
        .send(form)
        .query(query);

    if (type === 'json' && res.body.code === 'AUTH_NO_AUTH') {
        throw new Error('Unauthorized request');
    }
    else if (type === 'xml') {
        const err = res.xhr.responseXML.querySelector('error');
        if (err) {
            throw new Error(err);
        }
    }

    return type === 'json' ? res.body : res.xhr.responseXML;
}

export async function getUser() {
    const res = await sendRequest({
        url: `${API_URL}/settings_setup`,
        type: 'xml'
    });

    const redirect = res.querySelector('redirect');
    if (redirect) {
        return sendRequest({
            url: redirect.textContent,
            type: 'xml'
        });
    }

    return res.querySelector('body').querySelector('default_email').textContent;
}

export async function getMessagesCount() {
    const res = await sendRequest({
        url: `${API_URL}/v2/bar/counters`,
        query: {silent: true}
    });

    return res.counters.unread;
}

export function getSocketCredentials(uid) {
    if (!uid) {
        throw new Error('UID is not provided');
    }

    return sendRequest({
        url: `${DOMAIN}/neo2/handlers/xiva_sub.jsx`,
        query: {req: uid}
    });
}

export async function getMessages() {
    const res = await sendRequest({
        url: `${API_URL}/mailbox_list`,
        type: 'xml',
        query: {
            first: 0,
            last: 100,
            extra_cond: 'only_new',
            goto: 'all'
        }
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
            oper
        }
    });
}
