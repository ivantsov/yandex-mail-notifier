import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createUIStore} from 'redux-webext';
import App from './components/App';

import './styles/layout.less';

async function initApp() {
    const store = await createUIStore();

    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        mountNode,
    );
}

initApp();
