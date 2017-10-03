import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../HoverMenuButton';

jest.mock('shared/utils/i18n', () => ({
  text: jest.fn(() => 'text'),
}));

const props = {
  id: '123',
  onClick: jest.fn(),
  openMessage: jest.fn(),
};

function render(type) {
  const component = renderer.create(
    <Button
      {...props}
      type={type}
    />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onClick({stopPropagation: jest.fn()});
}

describe('popup/HoverMenu/HoverMenuButton', () => {
  it('read button', () => {
    render('read');

    expect(props.openMessage).not.toBeCalled();
    expect(props.onClick).lastCalledWith({
      id: props.id,
      oper: 'mark_read',
    });
  });

  it('remove button', () => {
    render('remove');

    expect(props.openMessage).not.toBeCalled();
    expect(props.onClick).lastCalledWith({
      id: props.id,
      oper: 'delete',
    });
  });

  it('spam button', () => {
    render('spam');

    expect(props.openMessage).not.toBeCalled();
    expect(props.onClick).lastCalledWith({
      id: props.id,
      oper: 'tospam',
    });
  });
});
