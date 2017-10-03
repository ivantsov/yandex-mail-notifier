import i18n from 'shared/utils/i18n';
import ReadIcon from './Icons/ReadIcon';
import RemoveIcon from './Icons/RemoveIcon';
import SpamIcon from './Icons/SpamIcon';

export default {
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
