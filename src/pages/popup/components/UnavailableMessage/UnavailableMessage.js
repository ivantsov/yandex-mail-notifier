import PropTypes from 'prop-types';
import React from 'react';
import Translation from '../Translation';
import Button from '../Button/Button';

import styles from './UnavailableMessage.less';

const UnavailableMessage = ({reloadApp}) => (
    <div className={styles.container}>
        <p><Translation id="notAuthorized.title"/></p>
        <p><Translation id="notAuthorized.subTitle"/></p>

        <div className={styles.btnContainer}>
            <Button onClick={reloadApp}>
                <Translation id="notAuthorized.btnText"/>
            </Button>
        </div>
    </div>
);

UnavailableMessage.propTypes = {
    reloadApp: PropTypes.func.isRequired,
};

export default UnavailableMessage;
