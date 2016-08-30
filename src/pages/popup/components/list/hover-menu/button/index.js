import styles from './button.less';

import React, {PropTypes, Component} from 'react';
import types from './types';

export default class Button extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
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

    // eslint-disable-next-line consistent-return
    onClick = () => {
        const {
            id,
            type,
            onClick
        } = this.props;
        const typeObj = types[type];

        // for open message action
        if (typeObj.action) {
            return typeObj.action(id);
        }

        // for the rest actions
        onClick({
            id,
            oper: typeObj.actionType
        });
    }
}

export {types};
