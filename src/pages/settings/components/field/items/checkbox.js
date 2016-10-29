import React, {PropTypes} from 'react';
import FieldPropTypes from './proptypes';

import styles from './field.less';

const Checkbox = ({
    name,
    label,
    description,
    value,
    onChange
}) => (
    <div className={styles.field}>
        <div>
            <label htmlFor={name} className={styles.label}>{label}</label>
            {description && <div className={styles.description}>{description}</div>}
        </div>
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
