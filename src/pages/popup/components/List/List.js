import PropTypes from 'prop-types';
import React from 'react';
import TransitionGroup from 'react-transition-group/CSSTransitionGroup';
import i18n from 'shared/utils/i18n';
import Item from './Item/Item';
import ItemPlaceholder from './ItemPlaceholder/ItemPlaceholder';

import styles from './List.less';
import itemStyles from './Item/Item.less';

const List = ({
    unreadMessagesCount,
    loading,
    error,
    items,
    onActionClick,
    openMessage,
}) => {
    if (loading) {
        const elements = Array.from(Array(unreadMessagesCount).keys())
            .map(index => <ItemPlaceholder key={index}/>);
        return <div className={styles.content}>{elements}</div>;
    }
    if (error || !items.length) {
        return (
            <div className={styles.centerContainer}>
                {i18n.text(`popup.${error ? 'loadingError' : 'emptyList'}`)}
            </div>
        );
    }

    const messages = items.map(item => (
        <Item
            key={item.id}
            onActionClick={onActionClick}
            openMessage={openMessage}
            {...item}
        />
    ));

    return (
        <TransitionGroup
            component="div"
            className={styles.content}
            transitionName={{
                leave: itemStyles.leave,
                leaveActive: itemStyles.leaveActive,
            }}
            transitionLeaveTimeout={200}
            transitionEnter={false}
        >
            {messages}
        </TransitionGroup>
    );
};

List.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    unreadMessagesCount: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
    })).isRequired,
    onActionClick: PropTypes.func.isRequired,
    openMessage: PropTypes.func.isRequired,
};

export default List;
