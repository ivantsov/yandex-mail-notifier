import React from 'react';
import renderer from 'react-test-renderer';
import Select from '../select';

describe('settings/Select', () => {
    it('without options', () => {
        const component = renderer.create(
            <Select
                name="field"
                value={123}
                options={[]}
                onChange={jest.fn()}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('with options', () => {
        const name = 'field';
        const onChangeValue = 10;
        const onChange = jest.fn();

        const component = renderer.create(
            <Select
                name={name}
                value={123}
                options={[{
                    label: 'option1',
                    value: 1
                }, {
                    label: 'option2',
                    value: 2
                }]}
                onChange={onChange}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // event.target.value will be "string" in real app, so we convert int to string
        tree.props.onChange({target: {value: onChangeValue.toString()}});
        expect(onChange).lastCalledWith(name, onChangeValue);
    });
});
