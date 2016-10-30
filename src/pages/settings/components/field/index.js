import React, {PropTypes} from 'react';
import types from './types';
import Checkbox from './items/checkbox';
import Select from './items/select';

import styles from './field.less';

const Field = (props) => {
    const {
        type,
        name,
        label,
        description
    } = props;

    const Component = type === types.checkbox ? Checkbox : Select;

    return (
        <tr>
            <td className={styles.label}>
                <label htmlFor={name}>{label}</label>
                {description && <div className={styles.description}>{description}</div>}
            </td>
            <td>
                <Component {...props}/>
            </td>
        </tr>
    );
};

Field.propTypes = {
    type: PropTypes.oneOf(Object.keys(types)).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Field;
