import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button/Button';
import Translation from '../Translation';
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
    <Button
      type="primary"
      onClick={() => openLink('#compose')}
    >
      <span className={styles.composeBtn}>
        <ComposeIcon className={styles.composeIcon}/>
        <Translation id="compose"/>
      </span>
    </Button>
    <div className={styles.centerBlock}>
      <a onClick={() => openLink()}>{/* we need callback here, otherwise event will be passed as a first param */}
        {user} (<strong>{unreadMessagesCount}</strong>)
      </a>
      <Button
        type="icon"
        disabled={disabled}
        onClick={reloadMessages}
      >
        <ReloadIcon className={styles.reloadIcon}/>
      </Button>
    </div>
    <Button
      type="icon"
      onClick={openSettings}
    >
      <SettingsIcon className={styles.settingsIcon}/>
    </Button>
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
