import React from 'react';
import renderer from 'react-test-renderer';
import openUrl, {openSettings} from 'shared/utils/tab';
import Header from '../index';

jest.mock('shared/utils/tab');

const onReloadClick = jest.fn();
const commonProps = {
    user: 'username@ya.ru',
    unreadMessagesCount: 5,
    disabled: false,
    onReloadClick
};

function render(props) {
    const component = renderer.create(
        <Header
            {...commonProps}
            {...props}
        />
    );

    return component.toJSON();
}

describe('popup/Header', () => {
    beforeEach(() => {
        window.chrome = {
            i18n: {
                getMessage: jest.fn(() => 'text')
            }
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

        const composeLink = tree.children.find(({type}) => type === 'a');
        composeLink.props.onClick();
        expect(openUrl).lastCalledWith('#compose');
    });

    it('callbacks', () => {
        const tree = render();
        const [
            composeLink,
            centerBlock,
            settingsLink
        ] = tree.children;

        composeLink.props.onClick();
        expect(openUrl).lastCalledWith('#compose');

        const [mailLink, reloadBtn] = centerBlock.children;

        mailLink.props.onClick();
        expect(openUrl).lastCalledWith();

        reloadBtn.props.onClick();
        expect(onReloadClick).lastCalledWith();

        settingsLink.props.onClick();
        expect(openSettings).lastCalledWith();
    });
});
