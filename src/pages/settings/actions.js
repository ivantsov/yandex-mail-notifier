export function updateSettings(name, value) {
    return {
        actionName: 'updateSettings',
        data: {
            [name]: value
        }
    };
}
