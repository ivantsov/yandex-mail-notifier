import PropTypes from 'prop-types';
import React from 'react';

import styles from './Button.less';

const TYPES = {
  primary: {
    name: 'primary',
    className: styles.primary,
  },
  secondary: {
    name: 'secondary',
    className: styles.secondary,
  },
  icon: {
    name: 'icon',
    className: styles.icon,
  },
};

const Button = ({
  children,
  onClick,
  disabled,
  type,
}) => (
  <button
    disabled={disabled}
    className={TYPES[type].className}
    onClick={onClick}
  >{children}</button>
);

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(TYPES)),
};
Button.defaultProps = {
  disabled: false,
  type: TYPES.primary.name,
};

export default Button;
