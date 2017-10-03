import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Header';

const reloadMessages = jest.fn();
const openLink = jest.fn();
const openSettings = jest.fn();

const commonProps = {
  user: 'username@ya.ru',
  unreadMessagesCount: 5,
  disabled: false,
  reloadMessages,
  openLink,
  openSettings,
};

function render(props) {
  const component = renderer.create(
    <Header
      {...commonProps}
      {...props}
    />,
  );

  return component.toJSON();
}

describe('popup/Header', () => {
  beforeEach(() => {
    window.chrome = {
      i18n: {
        getMessage: jest.fn(() => 'text'),
      },
    };
  });

  describe('render', () => {
    it('disabled', () => {
      const tree = render({disabled: true});
      expect(tree).toMatchSnapshot();
    });

    it('active', () => {
      const tree = render();
      expect(tree).toMatchSnapshot();
    });
  });

  it('callbacks', () => {
    const tree = render();
    const [
      composeLink,
      centerBlock,
      settingsLink,
    ] = tree.children;

    composeLink.props.onClick();
    expect(openLink).lastCalledWith('#compose');

    const [mailLink, reloadBtn] = centerBlock.children;

    mailLink.props.onClick();
    expect(openLink).lastCalledWith();

    reloadBtn.props.onClick();
    expect(reloadMessages).lastCalledWith();

    settingsLink.props.onClick();
    expect(openSettings).lastCalledWith();
  });
});
