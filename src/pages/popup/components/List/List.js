import PropTypes from 'prop-types';
import React from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import i18n from 'shared/utils/i18n';
import Item from './Item/Item';
import ItemPlaceholder from './ItemPlaceholder/ItemPlaceholder';

import styles from './List.less';
import itemStyles from './Item/Item.less';

function Placeholders({
  show,
  count,
}) {
  const elements = Array.from(Array(count).keys())
    .map(index => <ItemPlaceholder key={index}/>);
  const className = show ? styles.placeholders : styles.placeholdersLeave;

  return <div className={className}>{elements}</div>;
}
Placeholders.propTypes = {
  show: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
};

function List({
  items,
  onActionClick,
  openMessage,
}) {
  const messages = items.map(item => (
    <CSSTransition
      key={item.id}
      timeout={{exit: 200}}
      classNames={{
        exit: itemStyles.leave,
        exitActive: itemStyles.leaveActive,
      }}
    >
      <Item
        onActionClick={onActionClick}
        openMessage={openMessage}
        {...item}
      />
    </CSSTransition>
  ));

  return (
    <TransitionGroup>
      {messages}
    </TransitionGroup>
  );
}
List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onActionClick: PropTypes.func.isRequired,
  openMessage: PropTypes.func.isRequired,
};

const ListContainer = ({
  unreadMessagesCount,
  loading,
  error,
  items,
  onActionClick,
  openMessage,
}) => {
  const errorOrEmpty = error || (!items.length && !loading);
  if (errorOrEmpty) {
    return (
      <div className={styles.centerContainer}>
        {i18n.text(`popup.${error ? 'loadingError' : 'emptyList'}`)}
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <Placeholders
        show={loading}
        count={Math.min(unreadMessagesCount, 100)}
      />
      {!loading && <List
        items={items}
        onActionClick={onActionClick}
        openMessage={openMessage}
      />}
    </div>
  );
};

ListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  unreadMessagesCount: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onActionClick: PropTypes.func.isRequired,
  openMessage: PropTypes.func.isRequired,
};

export default ListContainer;
