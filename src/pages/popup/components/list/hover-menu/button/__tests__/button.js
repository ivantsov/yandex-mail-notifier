import React from 'react';
import renderer from 'react-test-renderer';
import openUrl from 'shared/utils/tab';
import Button from '../index';

jest.mock('shared/utils/tab');
jest.mock('shared/utils/i18n', () => ({
    text: jest.fn(() => 'text')
}));

const props = {
    id: '123',
    onClick: jest.fn()
};

function render(type) {
    const component = renderer.create(
        <Button
            {...props}
            type={type}
        />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onClick({stopPropagation: jest.fn()});
}

describe('popup/HoverMenu/Button', () => {
    it('open button', () => {
        render('open');

        expect(props.onClick).not.toBeCalled();
        expect(openUrl).lastCalledWith(`#message/${props.id}`);
    });

    it('read button', () => {
        render('read');

        expect(openUrl).not.toBeCalled();
        expect(props.onClick).lastCalledWith({
            id: props.id,
            oper: 'mark_read'
        });
    });

    it('remove button', () => {
        render('remove');

        expect(openUrl).not.toBeCalled();
        expect(props.onClick).lastCalledWith({
            id: props.id,
            oper: 'delete'
        });
    });

    it('spam button', () => {
        render('spam');

        expect(openUrl).not.toBeCalled();
        expect(props.onClick).lastCalledWith({
            id: props.id,
            oper: 'tospam'
        });
    });
});
