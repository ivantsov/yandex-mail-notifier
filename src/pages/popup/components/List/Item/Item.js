import PropTypes from 'prop-types';
import React, {Component} from 'react';
import i18n from 'shared/utils/i18n';
import HoverMenu from '../HoverMenu/HoverMenu';

import styles from './Item.less';

export default class Item extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    firstline: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onActionClick: PropTypes.func.isRequired,
    openMessage: PropTypes.func.isRequired,
  };

  render() {
    const {
      id,
      from,
      subject,
      firstline,
      date,
      onActionClick,
    } = this.props;

    return (
      <div
        className={styles.component}
        onClick={this.openMessage}
      >
        <div className={styles.topContainer}>
          <div className={styles.fromAndDate}>
            <p>
              <span className={styles.from}>{from}</span>
              <span className={styles.date}>{i18n.date(date)}</span>
            </p>
            <p className={styles.subject}>{subject}</p>
          </div>
          <div className={styles.hoverMenu}>
            <HoverMenu
              id={id}
              onActionClick={onActionClick}
            />
          </div>
        </div>

        <p className={styles.content}>{firstline}</p>
      </div>
    );
  }

  openMessage = () => {
    const {
      id,
      openMessage,
    } = this.props;

    openMessage(`#message/${id}`);
  }
}
