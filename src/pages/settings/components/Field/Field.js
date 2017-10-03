import PropTypes from 'prop-types';
import React from 'react';
import types from './types';
import Checkbox from './Items/Checkbox';
import Select from './Items/Select';
import Link from './Items/Link';

import styles from './Field.less';

const Field = (props) => {
  const {
    type,
    name,
    label,
    description,
  } = props;

  let Component;
  switch (type) {
    case types.checkbox:
      Component = Checkbox;
      break;
    case types.link:
      Component = Link;
      break;
    default:
      Component = Select;
  }

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
