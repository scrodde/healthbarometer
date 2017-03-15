import React from 'react';
import { connect } from 'react-redux';
import { authError } from '../actions';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
      rest.isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )
  } />
)

const mapStateToProps = (state, ownProps) => {
  const { auth } = state;
  return {
    isAuthenticated: _.get(auth, 'currentUser') || auth.isLoading
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authError: () => {
      dispatch(authError('You need to be logged in to view this page.'))
    }
  };
}

const PrivateRouteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute)

export default PrivateRouteContainer;
