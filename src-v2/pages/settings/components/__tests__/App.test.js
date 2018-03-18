import React from 'react';
import renderer from 'react-test-renderer';
import {AppComponent as App} from '../App';

jest.mock('shared/utils/i18n');
jest.mock('../Field/Field', () => (props) => <div {...props}>Field</div>);

it('settings/App', () => {
  const component = renderer.create(
    <App
      settings={{
        newMessageNotification: 0,
        unreadMessagesNotification: 0,
        unreadMessagesSound: false,
        notAuthNotification: 0,
        preferredDomain: 'ru',
      }}
      updateSettings={jest.fn()}
    />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
