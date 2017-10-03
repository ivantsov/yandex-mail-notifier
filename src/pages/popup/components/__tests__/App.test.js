import React from 'react';
import renderer from 'react-test-renderer';
import {AppComponent} from '../App';

jest.mock('shared/utils/i18n');
jest.mock('../Header/Header', () => () => <div>Header</div>);
jest.mock('../List/List', () => () => <div>List</div>);
jest.mock('../Donation/Donation', () => () => <div>Donation</div>);

const baseProps = {
  user: {
    authorized: true,
    email: 'test@ya.ru',
  },
  messages: {
    unreadCount: 5,
    items: [
      {id: 1},
      {id: 2},
    ],
    loading: false,
    error: false,
  },
  settings: {
    preferredDomain: 'ru',
  },
  loadMessages: jest.fn(),
  updateMessage: jest.fn(),
  openLink: jest.fn(),
  openSettings: jest.fn(),
  reloadApp: jest.fn(),
  openDonationLink: jest.fn(),
};

function render(props) {
  const component = renderer.create(
    <AppComponent
      {...baseProps}
      {...props}
    />,
  );

  return component.toJSON();
}

describe('popup/App', () => {
  it('authorized', () => {
    const tree = render();

    expect(tree).toMatchSnapshot();
    expect(baseProps.loadMessages).toHaveBeenCalledTimes(1);
  });

  it('not authorized', () => {
    const tree = render({
      user: {
        ...baseProps.user,
        authorized: false,
      },
    });

    expect(tree).toMatchSnapshot();
    expect(baseProps.loadMessages).not.toBeCalled();
  });
});
