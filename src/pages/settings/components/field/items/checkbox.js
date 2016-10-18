import React, {PropTypes} from 'react';
import FieldPropTypes from './proptypes';

const Checkbox = ({
    name,
    label,
    value,
    onChange
}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input
            type="checkbox"
            id={name}
            name={name}
            checked={value}
            onChange={e => onChange(name, e.target.checked)}
        />
    </div>
);

Checkbox.propTypes = {
    ...FieldPropTypes,
    value: PropTypes.bool.isRequired
};

export default Checkbox;
