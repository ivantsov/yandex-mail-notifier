import PropTypes from 'prop-types';
import React from 'react';
import Button, {types} from './HoverMenuButton/HoverMenuButton';

import styles from './HoverMenu.less';

const HoverMenu = ({
  id,
  onActionClick,
}) => {
  const buttons = Object.keys(types).map((key, index) => (
    <Button
      key={index}
      id={id}
      type={key}
      onClick={onActionClick}
    />
  ));

  return <div className={styles.component}>{buttons}</div>;
};

HoverMenu.propTypes = {
  id: PropTypes.string.isRequired,
  onActionClick: PropTypes.func.isRequired,
};

export default HoverMenu;
