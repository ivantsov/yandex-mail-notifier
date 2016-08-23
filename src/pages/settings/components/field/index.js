import React, {PropTypes} from 'react';
import types from './types';
import Checkbox from './items/checkbox';
import Select from './items/select';

const Field = (props) => {
    // TODO: we can't use the following line because the bug in babel - https://phabricator.babeljs.io/T7086
    // const {type, ...restProps} = props;
    const Component = props.type === types.checkbox ? Checkbox : Select;

    return <Component {...props} onChange={props.onChange}/>;
};

Field.propTypes = {
    type: PropTypes.oneOf(Object.keys(types)).isRequired
};

export default Field;
