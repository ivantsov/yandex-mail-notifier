import request from 'superagent';
import {getCurrentDomain} from '../services/cookie';
import parseXML from './parser';

// prevent sending 'Origin' header, otherwise yandex doesn't execute an operation
chrome.webRequest.onBeforeSendHeaders.addListener(({requestHeaders}) => ({
    requestHeaders: requestHeaders.filter(({name}) => name !== 'Origin')
}), {urls: [
    'https://mail.ya.ru/*',
    'https://mail.yandex.ru/*',
    'https://mail.yandex.ua/*',
    'https://mail.yandex.com/*',
    'https://mail.yandex.com.tr/*'
]}, ['blocking', 'requestHeaders']);

function getUrl(url, isApi = true) {
    const domain = getCurrentDomain();

    let finalUrl = `https://mail${domain}`;
    if (isApi) {
        finalUrl += '/api';
    }

    return `${finalUrl}/${url}`;
}

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
            throw new Error(err.textContent || err.getAttribute('code'));
        }
    }

    return type === 'json' ? res.body : res.xhr.responseXML;
}

export async function getUser() {
    const res = await sendRequest({
        url: getUrl('settings_setup'),
        type: 'xml'
    });

    return res.querySelector('body').querySelector('default_email').textContent;
}

export async function getMessagesCount() {
    const res = await sendRequest({
        url: getUrl('v2/bar/counters'),
        query: {silent: true}
    });

    return res.counters.unread;
}

export function getSocketCredentials(uid) {
    if (!uid) {
        throw new Error('UID is not provided');
    }

    return sendRequest({
        url: getUrl('neo2/handlers/xiva_sub.jsx', false),
        query: {req: uid}
    });
}

export async function getMessages() {
    const res = await sendRequest({
        url: getUrl('mailbox_list'),
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
        url: getUrl('mailbox_oper'),
        type: 'xml',
        form: {
            ids: [id],
            oper
        }
    });
}
