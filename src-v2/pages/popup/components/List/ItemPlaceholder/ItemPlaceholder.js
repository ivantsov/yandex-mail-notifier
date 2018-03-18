import React from 'react';

import styles from './ItemPlaceholder.less';

const PlaceholderItem = () => (
  <div className={styles.component}>
    <div className={styles.background}>
      <div className={styles.headerLeft}/>
      <div className={styles.headerRight}/>
      <div className={styles.headerBottom}/>
      <div className={styles.subHeader}/>
      <div className={styles.subHeaderBottom}/>
    </div>
  </div>
);

export default PlaceholderItem;
