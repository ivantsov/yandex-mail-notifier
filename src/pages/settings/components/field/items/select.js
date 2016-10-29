import React, {PropTypes} from 'react';
import FieldPropTypes from './proptypes';

import styles from './field.less';

const Checkbox = ({
    name,
    label,
    description,
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
        <div className={styles.field}>
            <div>
                <label htmlFor={name} className={styles.label}>{label}</label>
                {description && <div className={styles.description}>{description}</div>}
            </div>
            <select
                id={name}
                name={name}
                value={value}
                onChange={e => onChange(name, parseInt(e.target.value, 10))}
            >
                {optionElements}
            </select>
        </div>
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
