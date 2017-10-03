import React from 'react';
import renderer from 'react-test-renderer';
import Select from '../Select';

function testCase(props) {
  const component = renderer.create(
    <Select
      name="field"
      onChange={jest.fn()}
      {...props}
    />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  return tree;
}

describe('settings/Select', () => {
  it('no options', () => {
    testCase({
      value: 123,
      options: [],
    });
  });

  describe('with options', () => {
    function testCaseWithOptions({
      value,
      newValue,
      actualNewValue,
      options,
    }) {
      const name = 'field';
      const onChange = jest.fn();

      const tree = testCase({
        name,
        value,
        options,
        onChange,
      });

      tree.props.onChange({target: {value: newValue}});
      expect(onChange).lastCalledWith(name, actualNewValue);
    }

    describe('number options', () => {
      it('without zero value', () => {
        testCaseWithOptions({
          value: 1,
          newValue: '2', // select onChange always called with string
          actualNewValue: 2,
          options: [{
            label: 'option1',
            value: 1,
          }, {
            label: 'option2',
            value: 2,
          }],
        });
      });

      it('with zero value', () => {
        testCaseWithOptions({
          value: 1,
          newValue: '0', // select onChange always called with string
          actualNewValue: 0,
          options: [{
            label: 'option0',
            value: 0,
          }, {
            label: 'option1',
            value: 1,
          }],
        });
      });
    });

    it('string options', () => {
      testCaseWithOptions({
        value: 'opt1',
        newValue: 'opt2',
        actualNewValue: 'opt2',
        options: [{
          label: 'option1',
          value: 'opt1',
        }, {
          label: 'option2',
          value: 'opt2',
        }],
      });
    });
  });
});
