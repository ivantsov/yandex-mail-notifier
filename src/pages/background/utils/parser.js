const IGNORED_FOLDERS = [
  'spam',
  'archive',
  'trash',
  'sent',
  'outbox',
  'draft',
];

function getText(element, selector) {
  return element.querySelector(selector).textContent;
}

function getFilteredMessage(messages, folders) {
  return messages.filter(({fid}) => {
    const folder = folders.find(({id}) => id === fid);

    return folder && !IGNORED_FOLDERS.includes(folder.symbol);
  });
}

function parseFolders(folders) {
  return [...folders].map(folder => ({
    id: getText(folder, 'fid'),
    symbol: getText(folder, 'symbol'),
  }));
}

function parseMessages(messages) {
  return [...messages].map(message => {
    const from = message.querySelector('from');
    let subject = getText(message.querySelector('subject'), 'text');

    if (subject === 'No subject') {
      subject = '';
    }

    return {
      subject,
      id: message.getAttribute('mid'),
      from: getText(from, 'name') || getText(from, 'email'),
      firstline: getText(message, 'firstline'),
      date: message.getAttribute('recv_date'),
      fid: message.getAttribute('fid'),
    };
  });
}

export default function (xml) {
  let messages = xml.querySelector('mailbox_list');
  if (!messages) {
    throw new Error('Bad response format in messages xml');
  }

  let folders = xml.querySelector('folder_list');
  if (!folders) {
    throw new Error('Bad response format in folders xml');
  }

  const error = messages.querySelector('error');
  if (error) {
    throw new Error(`Messages xml has error field with code: ${error.getAttribute('code')}`);
  }

  messages = parseMessages(messages.querySelectorAll('message'));
  folders = parseFolders(folders.querySelectorAll('folder'));

  return getFilteredMessage(messages, folders);
}
