import PropTypes from 'prop-types';
import React from 'react';
import i18n from 'shared/utils/i18n';
import HoverMenu from '../HoverMenu/HoverMenu';

import styles from './Item.less';

const Item = ({
    id,
    from,
    subject,
    firstline,
    date,
    onActionClick,
    openMessage,
}) => (
    <div className={styles.component}>
        <div className={styles.contentContainer}>
            <p>
                <span className={styles.from}>{from}</span>
                <span className={styles.date}>{i18n.date(date)}</span>
            </p>
            <p className={styles.subject}>{subject}</p>
            <p className={styles.content}>{firstline}</p>
        </div>

        <HoverMenu
            id={id}
            onActionClick={onActionClick}
            openMessage={() => openMessage(`#message/${id}`)}
        />
    </div>
);

Item.propTypes = {
    id: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    firstline: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onActionClick: PropTypes.func.isRequired,
    openMessage: PropTypes.func.isRequired,
};

export default Item;
