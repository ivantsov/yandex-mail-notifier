import React from 'react';
import renderer from 'react-test-renderer';
import Field from '../index';

const props = {
    name: 'field',
    label: 'field label',
    description: 'field description',
    onChange: jest.fn()
};

describe('settings/Field', () => {
    it('checkbox', () => {
        const component = renderer.create(
            <Field
                {...props}
                type="checkbox"
                value={true}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('select', () => {
        const component = renderer.create(
            <Field
                {...props}
                type="select"
                value={1}
                options={[]}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
