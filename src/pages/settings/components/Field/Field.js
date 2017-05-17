import React, {PropTypes} from 'react';
import types from './types';
import Checkbox from './Items/Checkbox';
import Select from './Items/Select';

import styles from './Field.less';

const Field = (props) => {
    const {
        type,
        name,
        label,
        description,
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
};

export default Field;
