import PropTypes from 'prop-types';
import React, {Component} from 'react';
import types from './types';

import styles from './HoverMenuButton.less';

export default class HoverMenuButton extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        openMessage: PropTypes.func.isRequired,
    };

    render() {
        const {Icon, text} = types[this.props.type];

        return (
            <a className={styles.component} onClick={this.onClick}>
                <Icon className={styles.icon}/>
                <div>{text}</div>
            </a>
        );
    }

    onClick = (e) => {
        e.stopPropagation();

        const {
            id,
            type,
            onClick,
            openMessage,
        } = this.props;
        const typeObj = types[type];

        if (!typeObj.actionType) {
            // for open message action
            openMessage();
        }
        else {
            // for the rest actions
            onClick({
                id,
                oper: typeObj.actionType,
            });
        }
    }
}

export {types};
