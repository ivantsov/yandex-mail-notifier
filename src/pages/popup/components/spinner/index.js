import React from 'react';

import styles from './spinner.less';

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
