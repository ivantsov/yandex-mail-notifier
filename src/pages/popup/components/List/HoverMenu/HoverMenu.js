import React, {PropTypes} from 'react';
import Button, {types} from './HoverMenuButton/HoverMenuButton';

import styles from './HoverMenu.less';

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
