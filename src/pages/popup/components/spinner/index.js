import styles from './spinner.less';

import React from 'react';

const Spinner = () => (
    <div className={styles.component}>
        <div className={styles.rect1}/>
        <div className={styles.rect2}/>
        <div className={styles.rect3}/>
        <div className={styles.rect4}/>
        <div className={styles.rect5}/>
    </div>
);

export default Spinner;
