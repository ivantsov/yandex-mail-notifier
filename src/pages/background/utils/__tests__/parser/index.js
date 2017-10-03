import {folders, messages} from './fixtures';
import parseXML from '../../parser';

function createElement(
  name,
  children = [],
  attrs = {},
) {
  const element = document.createElement(name);
  children.forEach(child => element.appendChild(child));

  if (typeof attrs === 'object') {
    Object.keys(attrs).forEach(key => element.setAttribute(key, attrs[key]));
  } else {
    element.textContent = attrs;
  }

  return element;
}

const folderElements = folders.map(({id, symbol}) =>
  createElement('folder', [
    createElement('fid', [], id),
    createElement('symbol', [], symbol),
  ]),
);

const messageElements = messages.map(({
  id,
  subject,
  from,
  firstline,
  date,
  fid,
}) =>
  createElement('message', [
    createElement('from', [
      createElement('name', [], from.name),
      createElement('email', [], from.email),
    ]),
    createElement('subject', [
      createElement('text', [], subject),
    ]),
    createElement('firstline', [], firstline),
  ], {
    mid: id,
    recv_date: date,
    fid,
  }),
);

describe('background/utils/parser', () => {
  describe('bad xml', () => {
    it('messages', () => {
      const xml = createElement('doc', [createElement('folder_list')]);

      expect(() => parseXML(xml)).toThrowError('Bad response format in messages xml');
    });

    it('folders', () => {
      const xml = createElement('doc', [createElement('mailbox_list')]);

      expect(() => parseXML(xml)).toThrowError('Bad response format in folders xml');
    });

    it('error', () => {
      const errorCode = 500;
      const xml = createElement('doc', [
        createElement('mailbox_list', [
          createElement('error', [], {code: errorCode}),
        ]),
        createElement('folder_list'),
      ]);

      expect(() => parseXML(xml)).toThrowError(`Messages xml has error field with code: ${errorCode}`);
    });
  });

  describe('valid xml', () => {
    it('no messages', () => {
      const expected = [];
      const xml = createElement('doc', [
        createElement('mailbox_list', expected),
        createElement('folder_list'),
      ]);

      expect(parseXML(xml)).toEqual(expected);
    });

    it('with folders filtering', () => {
      const xml = createElement('doc', [
        createElement('mailbox_list', [
          createElement('details'),
          ...messageElements,
        ]),
        createElement('folder_list', folderElements),
      ]);

      const items = parseXML(xml);
      const expected = messages[1];
      const result = items[0];

      expect(items.length).toBe(1);
      expect(result).toEqual({
        ...expected,
        date: expected.date.toString(),
        from: expected.from.name,
        subject: '',
      });
    });
  });
});
