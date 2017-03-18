import React, {PropTypes} from 'react';
import FieldPropTypes from './proptypes';

const Checkbox = ({
    name,
    value,
    onChange,
}) => (
    <input
        type="checkbox"
        id={name}
        name={name}
        checked={value}
        onChange={e => onChange(name, e.target.checked)}
    />
);

Checkbox.propTypes = {
    ...FieldPropTypes,
    value: PropTypes.bool.isRequired,
};

export default Checkbox;
