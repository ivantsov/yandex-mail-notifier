import React from 'react';
import renderer from 'react-test-renderer';
import Field from '../Field';

jest.mock('../Items/Checkbox', () => (props) => <div {...props}>Checkbox</div>);
jest.mock('../Items/Select', () => (props) => <div {...props}>Select</div>);
jest.mock('../Items/Link', () => (props) => <div {...props}>Link</div>);

function testCase(props) {
  const component = renderer.create(
    <Field
      name="field"
      label="field label"
      description="field description"
      {...props}
    />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
}

describe('settings/Field', () => {
  it('checkbox', () => {
    testCase({
      type: 'checkbox',
      value: false,
      onChange: jest.fn(),
    });
  });

  it('select', () => {
    testCase({
      type: 'select',
      value: 1,
      onChange: jest.fn(),
    });
  });

  it('link', () => {
    testCase({
      type: 'link',
      url: 'https://smth.com',
      text: 'site url',
    });
  });
});
