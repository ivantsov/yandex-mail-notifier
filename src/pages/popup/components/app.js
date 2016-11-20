import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from './header';
import List from './list';

class App extends Component {
    static propTypes = {
        user: PropTypes.shape({
            email: PropTypes.string.isRequired
        }).isRequired,
        messages: PropTypes.shape({
            unreadCount: PropTypes.number.isRequired,
            items: PropTypes.arrayOf(PropTypes.object).isRequired,
            loading: PropTypes.bool.isRequired,
            error: PropTypes.bool.isRequired
        }).isRequired,
        loadMessages: PropTypes.func.isRequired,
        updateMessage: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.loadMessages();
    }

    render() {
        const {
            user: {email},
            messages: {
                unreadCount,
                items,
                loading,
                error
            },
            loadMessages,
            updateMessage
        } = this.props;

        return (
            <div>
                <Header
                    user={email}
                    unreadMessagesCount={unreadCount}
                    disabled={loading}
                    onReloadClick={loadMessages}
                />
                <List
                    items={items}
                    loading={loading}
                    error={error}
                    onActionClick={updateMessage}
                />
            </div>
        );
    }
}

export default connect(state => state, actions)(App);
