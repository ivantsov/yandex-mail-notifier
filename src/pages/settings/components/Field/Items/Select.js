import PropTypes from 'prop-types';
import React, {Component} from 'react';
import FieldPropTypes from './proptypes';

export default class Select extends Component {
  static propTypes = {
    ...FieldPropTypes,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  }

  render() {
    const {
      name,
      value,
      options,
    } = this.props;

    const optionElements = options.map((item, index) => (
      <option key={index} value={item.value}>
        {item.label}
      </option>
    ));

    return (
      <select
        id={name}
        name={name}
        value={value}
        onChange={this.onChange}
      >{optionElements}</select>
    );
  }

  onChange = (e) => {
    const {
      name,
      onChange,
    } = this.props;
    const {value} = e.target;
    const parsedValue = isNaN(value) ? value : parseInt(value, 10);

    onChange(name, parsedValue);
  }
}
