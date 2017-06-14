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
            expect(onChange).lastCalledWith(name, newValue);
        }

        it('number options', () => {
            testCaseWithOptions({
                value: 1,
                newValue: 10,
                options: [{
                    label: 'option1',
                    value: 1,
                }, {
                    label: 'option2',
                    value: 2,
                }],
            });
        });

        it('string options', () => {
            testCaseWithOptions({
                value: 'opt1',
                newValue: 'opt2',
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
