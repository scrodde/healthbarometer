import _ from 'lodash';
import { connect } from 'react-redux';

import Notification from '../components/Notification';

const mapStateToProps = (state, ownProps) => {
  const { auth } = state;
  return {
    message: _.get(auth, 'errorMessage', ''),
    type: 'error'
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
}

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)

export default NotificationContainer;
