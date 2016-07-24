import styles from './header.less';

import React, {PropTypes} from 'react';
import LogoIcon from './icons/logo';
import ReloadIcon from './icons/reload';
import ComposeIcon from './icons/compose';
// import l10n from '../utils/l10n';
// import openTab from '../utils/tab';

const Header = ({
    user,
    unreadMessagesCount,
    disable,
    onReloadClick
}) => (
    <div className={styles.component}>
        <span
            className={styles.item}
            onClick={() => {} /*openTab()*/}
        >
            <LogoIcon className={styles.logoIcon}/>
        </span>
        <div className={styles.item}>
            <span onClick={() =>  {} /*openTab()*/}>
                {user} (<strong>{unreadMessagesCount}</strong>)
            </span>
            <button
                className={styles.reloadBtn}
                disabled={disable}
                onClick={onReloadClick}
            >
                <ReloadIcon className={styles.reloadIcon}/>
            </button>
        </div>
        <span
            className={styles.item}
            onClick={() =>  {} /*openTab('#compose')*/}
        >
            <ComposeIcon className={styles.composeIcon}/>
            {/*l10n.text('compose')*/}
        </span>
    </div>
);

Header.propTypes = {
    user: PropTypes.string.isRequired,
    unreadMessagesCount: PropTypes.number.isRequired,
    disable: PropTypes.bool.isRequired,
    onReloadClick: PropTypes.func.isRequired
};

export default Header;
