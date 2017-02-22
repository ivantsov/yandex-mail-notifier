import request from 'superagent';
import {getUid} from '../modules/cookie';
import parseXML from './parser';

const DOMAIN = 'https://mail.yandex.ru';
const API_URL = `${DOMAIN}/api`;

// prevent sending 'Origin' header, otherwise yandex doesn't execute an operation
chrome.webRequest.onBeforeSendHeaders.addListener(({requestHeaders}) => ({
    requestHeaders: requestHeaders.filter(({name}) => name !== 'Origin')
}), {urls: [`${API_URL}/*`]}, ['blocking', 'requestHeaders']);

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
        const {responseXML} = res.xhr;

        // sometimes Yandex sends "redirect" instead of result, so we need just follow that url in response
        // check on "redirect_to" should be before "error", because "redirect_to" response contains "error" as well
        const redirect = responseXML.querySelector('redirect_to');
        if (redirect) {
            return sendRequest({
                ...data,
                url: redirect.textContent
            });
        }

        const err = responseXML.querySelector('error');
        if (err) {
            const errText = err.textContent || err.getAttribute('code');
            throw new Error(`Error in the response: ${errText}`);
        }
    }

    return type === 'json' ? res.body : res.xhr.responseXML;
}

export async function getUser() {
    const res = await sendRequest({
        url: `${API_URL}/settings_setup`,
        type: 'xml'
    });

    return res.querySelector('body').querySelector('default_email').textContent;
}

export async function getMessagesCount() {
    const res = await sendRequest({
        url: `${API_URL}/v2/bar/counters`,
        query: {silent: true}
    });

    if (!res.counters) {
        throw new Error(res);
    }

    return res.counters.unread;
}

export async function getSocketCredentials() {
    const uid = await getUid();

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
