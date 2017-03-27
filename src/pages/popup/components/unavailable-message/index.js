import React, {PropTypes} from 'react';
import i18n from 'shared/utils/i18n';

import styles from './unavailable-message.less';

const UnavailableMessage = ({
    reloadApp,
}) => (
    <div className={styles.container}>
        <p>{i18n.text('popup.notAuthorized.title')}</p>
        <p>{i18n.text('popup.notAuthorized.subTitle')}</p>

        <button
            className={styles.btn}
            onClick={reloadApp}
        >{i18n.text('popup.notAuthorized.btnText')}</button>
    </div>
);

UnavailableMessage.propTypes = {
    reloadApp: PropTypes.func.isRequired,
};

export default UnavailableMessage;
