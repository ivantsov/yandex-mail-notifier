import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import UnavailableMessage from './UnavailableMessage/UnavailableMessage';
import Donation from './Donation/Donation';
import Header from './Header/Header';
import List from './List/List';

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
    settings: PropTypes.shape({
      preferredDomain: PropTypes.string.isRequired,
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
      settings: {
        preferredDomain,
      },
      loadMessages,
      updateMessage,
      openLink,
      openSettings,
      reloadApp,
      openDonationLink,
    } = this.props;

    if (!user.authorized) {
      return (
        <UnavailableMessage
          domain={preferredDomain}
          reloadApp={reloadApp}
        />
      );
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
