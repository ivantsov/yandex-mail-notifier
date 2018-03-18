import PropTypes from 'prop-types';
import React, {Component} from 'react';
import types from './types';

import styles from './HoverMenuButton.less';

export default class HoverMenuButton extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const {Icon, text} = types[this.props.type];

    return (
      <span
        title={text}
        className={styles.component}
        onClick={this.onClick}
      >
        <Icon className={styles.icon}/>
      </span>
    );
  }

  onClick = (e) => {
    e.stopPropagation();

    const {
      id,
      type,
      onClick,
    } = this.props;
    const typeObj = types[type];

    onClick({
      id,
      oper: typeObj.actionType,
    });
  };
}

export {types};
