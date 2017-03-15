import React from 'react';
import _ from 'lodash';

class Notification extends React.Component {
  render() {
    const { message, type } = this.props;
    if (_.isEmpty(message)) {
      return null;
    }
    return (
      <div className={`notification__container ${type}`}>
        <div className="notification__content">
          <span>{message}</span>
        </div>
      </div>
    );
  }
}

export default Notification;
