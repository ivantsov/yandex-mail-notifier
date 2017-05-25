import React from 'react';
import renderer from 'react-test-renderer';
import {AppComponent as App} from '../App';

jest.mock('shared/utils/i18n');

it('settings/App', () => {
    const component = renderer.create(
        <App
            settings={{
                newMessageNotification: 0,
                unreadMessagesNotification: 0,
                unreadMessagesSound: false,
                notAuthNotification: 0,
            }}
            updateSettings={jest.fn()}
        />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
