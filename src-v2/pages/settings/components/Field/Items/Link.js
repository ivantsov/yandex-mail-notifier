import PropTypes from 'prop-types';
import React, {Component} from 'react';

export default class Link extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }

  render() {
    return <a href="" onClick={this.onClick}>{this.props.text}</a>;
  }

  onClick = () => {
    chrome.tabs.create({url: this.props.url});
  }
}
