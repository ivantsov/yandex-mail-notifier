import React, {PropTypes} from 'react';

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
    notButton: {
        name: 'notButton',
        className: styles.notBtn,
    },
};

const Button = ({
    children,
    onClick,
    type,
}) => (
    <button
        className={TYPES[type].className}
        onClick={onClick}
    >{children}</button>
);

Button.propTypes = {
    children: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(Object.keys(TYPES)),
};
Button.defaultProps = {
    type: TYPES.primary.name,
};

export default Button;
