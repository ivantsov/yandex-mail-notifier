import styles from './spinner.less';

import React from 'react';

// TODO: don't use "center" class name
const Spinner = () => (
    <div className="center">
        <div className={styles.component}>
            <div className={styles.rect1}></div>
            <div className={styles.rect2}></div>
            <div className={styles.rect3}></div>
            <div className={styles.rect4}></div>
            <div className={styles.rect5}></div>
        </div>
    </div>
);

export default Spinner;
