import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';

import FaHeart from 'react-icons/lib/fa/heart';

import ThankYou from '../ThankYou';
import NoMatch from '../NoMatch';
import Intro from '../Intro';
import PrivateRoute from '../../containers/PrivateRoute';
import NotificationContainer from '../../containers/NotificationContainer';
import FormContainer from '../../containers/FormContainer';

import styles from './styles.scss';

class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location &&
        typeof window !== 'undefined' && window.ga) {
      window.ga('set', 'page', location.pathname);
      window.ga('send', 'pageview');
    }
  }

  render() {
    const { currentUser, authUrl, baseUrl } = this.props;

    return (
      <div className="app__container">
        <NotificationContainer message="hehe" type="error" />
        <header>
          <nav>
            <figure>
              <span className="intials">{_.get(currentUser, 'initials', '?')}</span>
            </figure>
          </nav>
        </header>
        <section className="content">
          <div className="content__wrapper">
            <Switch>
              <Route exact path="/" render={() => (
                <Intro authUrl={authUrl} baseUrl={baseUrl} />
              )} />
              <Route path="/thankyou" component={ThankYou} />
              <PrivateRoute path="/forms/:id" component={FormContainer} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </section>
        <footer>
          <div>Made with <FaHeart /> by <a target="_blank" href="https://scrod.de">@scrodde</a></div>
          <div>Check me out on <a target="_blank" href="https://github.com/scrodde/healthbarometer">Github</a></div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { auth, config } = state;

  return {
    currentUser: _.get(auth, 'currentUser'),
    authUrl: _.get(config, 'authUrl'),
    baseUrl: _.get(config, 'baseUrl'),
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
