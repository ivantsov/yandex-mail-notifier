export function openUrl(url = '') {
    // when we use the function as a callback for click event, "url" will be an event object
    let finalUrl = typeof url !== 'string' ? '' : url;
    // e.g. donation link is absolute however others are relative
    if (!finalUrl.startsWith('http')) {
        finalUrl = `https://mail.yandex.ru/${finalUrl}`;
    }

    chrome.tabs.create({url: finalUrl});
}

export function openSettings() {
    chrome.runtime.openOptionsPage();
}
