import React, {PropTypes} from 'react';
import i18n from 'shared/utils/i18n';
import openUrl, {openSettings} from 'shared/utils/tab';
import SettingsIcon from './icons/settings';
import ReloadIcon from './icons/reload';
import ComposeIcon from './icons/compose';

import styles from './header.less';

const Header = ({
    user,
    unreadMessagesCount,
    disabled,
    onReloadClick
}) => (
    <div className={styles.component}>
        <a className={styles.composeBtn} onClick={() => openUrl('#compose')}>
            <ComposeIcon className={styles.composeIcon}/>
            {i18n.text('popup.compose')}
        </a>
        <div className={styles.centerBlock}>
            <a onClick={openUrl}>
                {user} (<strong>{unreadMessagesCount}</strong>)
            </a>
            <button
                className={styles.reloadBtn}
                disabled={disabled}
                onClick={onReloadClick}
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
    onReloadClick: PropTypes.func.isRequired
};

export default Header;
