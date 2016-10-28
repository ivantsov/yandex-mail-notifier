const notification = chrome.notifications;
const audio = new Audio('../assets/notification.wav');
const notifications = {};

notification.onClicked.addListener(id => {
    notifications[id]();
    delete notifications[id];
});

export function show(data) {
    notification.create({
        type: 'basic',
        iconUrl: '../assets/icon.png',
        title: data.title,
        message: data.subTitle,
        contextMessage: data.message
    }, (id) => {
        notifications[id] = data.onClick;
    });
}

export function play() {
    audio.play();
}
