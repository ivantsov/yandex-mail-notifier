import React, {PropTypes} from 'react';
import i18n from 'shared/utils/i18n';
import SettingsIcon from './Icons/SettingsIcon';
import ReloadIcon from './Icons/ReloadIcon';
import ComposeIcon from './Icons/ComposeIcon';

import styles from './Header.less';

const Header = ({
    user,
    unreadMessagesCount,
    disabled,
    reloadMessages,
    openLink,
    openSettings,
}) => (
    <div className={styles.component}>
        <a className={styles.composeBtn} onClick={() => openLink('#compose')}>
            <ComposeIcon className={styles.composeIcon}/>
            {i18n.text('popup.compose')}
        </a>
        <div className={styles.centerBlock}>
            <a onClick={() => openLink()}>{/* we need callback here, otherwise event will be passed as a first param*/}
                {user} (<strong>{unreadMessagesCount}</strong>)
            </a>
            <button
                className={styles.reloadBtn}
                disabled={disabled}
                onClick={() => reloadMessages(true)}
            >
                <ReloadIcon className={styles.reloadIcon}/>
            </button>
        </div>
        <a className={styles.item} onClick={openSettings}>
            <SettingsIcon className={styles.settingsIcon}/>
        </a>
    </div>
);

Header.propTypes = {
    user: PropTypes.string.isRequired,
    unreadMessagesCount: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    reloadMessages: PropTypes.func.isRequired,
    openLink: PropTypes.func.isRequired,
    openSettings: PropTypes.func.isRequired,
};

export default Header;
