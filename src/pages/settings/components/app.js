import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import config from './config';
import Field from './field';

const App = ({settings, updateSettings}) => {
    const fields = config.map((item, index) =>
        <Field
            key={index}
            {...item}
            value={settings[item.name]}
            onChange={updateSettings}
        />
    );

    return <div>{fields}</div>;
};

App.propTypes = {
    settings: PropTypes.object.isRequired,
    updateSettings: PropTypes.func.isRequired
};

export default connect(state => state, actions)(App);
