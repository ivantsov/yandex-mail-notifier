export default function (url = '') {
    // when we use the function as a callback for click event, "url" will be an event object
    const finalUrl = typeof url !== 'string' ? '' : url;

    chrome.tabs.create({url: `https://mail.yandex.ru/${finalUrl}`});
}

export function openSettings() {
    chrome.runtime.openOptionsPage();
}
