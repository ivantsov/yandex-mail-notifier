import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {openUrl} from 'shared/utils/tab';

export default class Link extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
    }

    render() {
        return <a href="" onClick={this.onClick}>{this.props.value}</a>;
    }

    onClick = () => {
        openUrl(this.props.value);
    }
}
