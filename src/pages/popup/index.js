import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

ReactDOM.render(
    <App
        user="supertestuser@yandex.com"
        messages={{
            unreadCount: 56,
            items: [{
                id: 1,
                text: 'Test'
            }],
            loading: false,
            error: false
        }}
        notification={0}
        loadMessages={() => {}}
        updateMessage={() => {}}
    />
, mountNode);
