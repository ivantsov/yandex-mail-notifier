import React, {PropTypes} from 'react';
import FieldPropTypes from './proptypes';

const Checkbox = ({
    name,
    value,
    options,
    onChange
}) => {
    const optionElements = options.map((item, index) =>
        <option key={index} value={item.value}>
            {item.label}
        </option>
    );

    return (
        <select
            id={name}
            name={name}
            value={value}
            onChange={e => onChange(name, parseInt(e.target.value, 10))}
        >{optionElements}</select>
    );
};

Checkbox.propTypes = {
    ...FieldPropTypes,
    value: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired
};

export default Checkbox;
