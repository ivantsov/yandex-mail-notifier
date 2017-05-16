import React, {PropTypes} from 'react';
import Button from '../Button/Button';
import Translation from '../Translation';

import styles from './Donation.less';

export default function Donation({openDonationLink}) {
    return (
        <div className={styles.component}>
            <Translation id="donation.text"/>
            <div className={styles.btn}>
                <Button
                    type="secondary"
                    onClick={openDonationLink}
                >
                    <Translation id="donation.donateBtn"/>
                </Button>
            </div>
        </div>
    );
}
Donation.propTypes = {
    openDonationLink: PropTypes.func.isRequired,
};
