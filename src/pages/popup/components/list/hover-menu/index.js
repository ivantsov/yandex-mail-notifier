import styles from './hover-menu.less';

import React, {PropTypes} from 'react';
import Button, {types} from './button';

const HoverMenu = ({
    id,
    onClick
}) => {
    const buttons = Object.keys(types).map((key, index) => (
        <Button
            key={index}
            id={id}
            type={key}
            onClick={onClick}
        />
    ));

    return <div className={styles.component}>{buttons}</div>;
};

HoverMenu.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default HoverMenu;
