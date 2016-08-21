export function loadMessages() {
    return {actionName: 'loadMessages'};
}

export function updateMessage(data) {
    return {
        actionName: 'updateMessage',
        data
    };
}
