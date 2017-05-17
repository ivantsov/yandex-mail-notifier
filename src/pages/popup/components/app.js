import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import UnavailableMessage from './UnavailableMessage/UnavailableMessage';
import Donation from './Donation/Donation';
import Header from './header';
import List from './list';

class App extends Component {
    static propTypes = {
        user: PropTypes.shape({
            authorized: PropTypes.bool.isRequired,
            email: PropTypes.string.isRequired,
        }).isRequired,
        messages: PropTypes.shape({
            unreadCount: PropTypes.number.isRequired,
            items: PropTypes.arrayOf(PropTypes.object).isRequired,
            loading: PropTypes.bool.isRequired,
            error: PropTypes.bool.isRequired,
        }).isRequired,
        loadMessages: PropTypes.func.isRequired,
        updateMessage: PropTypes.func.isRequired,
        openLink: PropTypes.func.isRequired,
        openSettings: PropTypes.func.isRequired,
        reloadApp: PropTypes.func.isRequired,
        openDonationLink: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const {
            user,
            loadMessages,
        } = this.props;

        if (user.authorized) {
            loadMessages();
        }
    }

    render() {
        const {
            user,
            messages: {
                unreadCount,
                items,
                loading,
                error,
            },
            loadMessages,
            updateMessage,
            openLink,
            openSettings,
            reloadApp,
            openDonationLink,
        } = this.props;

        if (!user.authorized) {
            return <UnavailableMessage reloadApp={reloadApp}/>;
        }

        return (
            <div>
                <Header
                    user={user.email}
                    unreadMessagesCount={unreadCount}
                    disabled={loading}
                    reloadMessages={loadMessages}
                    openLink={openLink}
                    openSettings={openSettings}
                />
                <List
                    loading={loading}
                    error={error}
                    unreadMessagesCount={unreadCount}
                    items={items}
                    onActionClick={updateMessage}
                    openMessage={openLink}
                />
                <Donation onClick={openDonationLink}/>
            </div>
        );
    }
}

export default connect(state => state, actions)(App);
export {App as AppComponent}; // for test purpose
