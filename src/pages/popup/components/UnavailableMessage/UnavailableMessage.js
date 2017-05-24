import PropTypes from 'prop-types';
import React from 'react';
import Translation from '../Translation';
import Button from '../Button/Button';

import styles from './UnavailableMessage.less';

const UnavailableMessage = ({reloadApp}) => (
    <div className={styles.container}>
        <div>
            <h1 className={styles.title}><Translation id="unavailable.title"/></h1>

            <p className={styles.subTitle}><Translation id="unavailable.subTitle"/></p>
            <ol>
                <li>
                    <strong><Translation id="unavailable.notAuth.label"/></strong>
                    <ul>
                        <li><Translation id="unavailable.notAuth.checkAuth"/></li>
                        <li><Translation id="unavailable.notAuth.relogin"/></li>
                    </ul>
                </li>
                <li>
                    <strong><Translation id="unavailable.noConnection.label"/></strong>
                </li>
            </ol>
        </div>


        <p className={styles.btnTitle}><Translation id="unavailable.nothingHelped"/></p>
        <div className={styles.btnContainer}>
            <Button onClick={reloadApp}>
                <Translation id="unavailable.reloadBtn"/>
            </Button>
        </div>
    </div>
);

UnavailableMessage.propTypes = {
    reloadApp: PropTypes.func.isRequired,
};

export default UnavailableMessage;
