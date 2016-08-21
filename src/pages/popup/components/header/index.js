import styles from './header.less';

import React, {PropTypes} from 'react';
import i18n from 'utils/i18n';
import openUrl, {openSettings} from 'utils/tab';
import SettingsIcon from './icons/settings';
import ReloadIcon from './icons/reload';
import ComposeIcon from './icons/compose';

// TODO: update styles to make centered on one line
const Header = ({
    user,
    unreadMessagesCount,
    disable,
    onReloadClick
}) => (
    <div className={styles.component}>
        <a className={styles.composeBtn} onClick={() => openUrl('#compose')}>
            <ComposeIcon className={styles.composeIcon}/>
            {i18n.text('popup.compose')}
        </a>
        <div className={styles.item}>
            <a onClick={openUrl}>
                {user} (<strong>{unreadMessagesCount}</strong>)
            </a>
            <button
                className={styles.reloadBtn}
                disabled={disable}
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
    disable: PropTypes.bool.isRequired,
    onReloadClick: PropTypes.func.isRequired
};

export default Header;
