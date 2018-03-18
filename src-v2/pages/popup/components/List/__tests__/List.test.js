import React from 'react';
import renderer from 'react-test-renderer';
import List from '../List';

jest.mock('shared/utils/i18n', () => {
  const i18nKeys = {
    'popup.loadingError': 'error',
    'popup.emptyList': 'no items',
  };

  return {
    text(key) {
      return i18nKeys[key];
    },
    date(str) {
      return str;
    },
  };
});

const defaultProps = {
  loading: false,
  error: false,
  unreadMessagesCount: 0,
  items: [],
  onActionClick: jest.fn(),
  openMessage: jest.fn(),
};

function render(props) {
  const component = renderer.create(
    <List
      {...defaultProps}
      {...props}
    />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
}

describe('popup/List', () => {
  it('loading', () => {
    render({
      loading: true,
      unreadMessagesCount: 3,
    });
  });

  it('error', () => {
    render({error: true});
  });

  it('no items', () => {
    render();
  });

  it('with items', () => {
    render({items: [{
      id: '1',
      from: 'sender#1',
      subject: 'subject#1',
      firstline: 'text',
      date: '21-20-2015',
    }, {
      id: '2',
      from: 'sender#2',
      subject: 'subject#2',
      firstline: 'text',
      date: '21-20-2016',
    }]});
  });
});
