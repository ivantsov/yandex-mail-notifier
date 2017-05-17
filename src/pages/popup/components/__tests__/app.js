import React from 'react';
import renderer from 'react-test-renderer';
import {AppComponent} from '../app';

jest.mock('shared/utils/i18n', () => {
    return {
        text(key) {
            return key;
        },
        date(str) {
            return str;
        },
    };
});
jest.mock('../header', () => () => <div>Header</div>);
jest.mock('../list', () => () => <div>List</div>);

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
