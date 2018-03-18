import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button/Button';
import Translation from '../Translation';

import styles from './Donation.less';

export default function Donation({onClick}) {
  return (
    <div className={styles.component}>
      <Translation id="donation.text"/>
      <div className={styles.btn}>
        <Button
          type="secondary"
          onClick={onClick}
        >
          <Translation id="donation.donateBtn"/>
        </Button>
      </div>
    </div>
  );
}
Donation.propTypes = {
  onClick: PropTypes.func.isRequired,
};
