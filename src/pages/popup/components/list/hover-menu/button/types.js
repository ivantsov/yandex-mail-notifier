import i18n from 'shared/utils/i18n';
import openUrl from 'shared/utils/tab';
import OpenIcon from './icons/open';
import ReadIcon from './icons/read';
import RemoveIcon from './icons/remove';
import SpamIcon from './icons/spam';

export default {
    open: {
        Icon: OpenIcon,
        action(id) {
            openUrl(`#message/${id}`);
        },
        text: i18n.text('popup.actions.open'),
    },
    read: {
        Icon: ReadIcon,
        actionType: 'mark_read',
        text: i18n.text('popup.actions.read'),
    },
    remove: {
        Icon: RemoveIcon,
        actionType: 'delete',
        text: i18n.text('popup.actions.remove'),
    },
    spam: {
        Icon: SpamIcon,
        actionType: 'tospam',
        text: i18n.text('popup.actions.spam'),
    },
};
