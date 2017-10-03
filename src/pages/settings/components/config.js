import appConfig from 'shared/config';
import i18n from 'shared/utils/i18n';
import types from './Field/types';

const fields = [{
  type: types.select,
  name: 'newMessageNotification',
  optionValues: [0, 1, 2],
}, {
  type: types.select,
  name: 'unreadMessagesNotification',
  optionValues: [0, 5, 15, 30], // interval in min
}, {
  type: types.checkbox,
  name: 'unreadMessagesSound',
}, {
  type: types.select,
  name: 'notAuthNotification',
  optionValues: [0, 1, 2],
}, {
  type: types.select,
  name: 'preferredDomain',
  optionValues: appConfig.supportedDomains,
}];

// TODO: enable it for FF as well https://bugzilla.mozilla.org/show_bug.cgi?id=1303384
if (typeof browser === 'undefined') {
  fields.push({
    type: types.link,
    name: 'setShortcuts',
    url: 'chrome://extensions/configureCommands',
    text: i18n.text('settings.setShortcuts.linkText'),
  });
}

export default fields.map(field => {
  const baseKey = `settings.${field.name}`;
  let options;

  if (field.hasOwnProperty('optionValues')) {
    options = field.optionValues.map((value, index) => ({
      value,
      label: i18n.text(`${baseKey}.options.${index}`),
    }));
  }

  return {
    ...field,
    label: i18n.text(`${baseKey}.label`),
    description: i18n.text(`${baseKey}.description`),
    options,
  };
});
