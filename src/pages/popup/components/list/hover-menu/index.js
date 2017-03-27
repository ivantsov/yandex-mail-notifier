import React, {PropTypes} from 'react';
import Button, {types} from './button';

import styles from './hover-menu.less';

const HoverMenu = ({
    id,
    onActionClick,
    openMessage,
}) => {
    const buttons = Object.keys(types).map((key, index) => (
        <Button
            key={index}
            id={id}
            type={key}
            onClick={onActionClick}
            openMessage={openMessage}
        />
    ));

    return (
        <div
            className={styles.component}
            onClick={openMessage}
        >{buttons}</div>
    );
};

HoverMenu.propTypes = {
    id: PropTypes.string.isRequired,
    onActionClick: PropTypes.func.isRequired,
    openMessage: PropTypes.func.isRequired,
};

export default HoverMenu;
