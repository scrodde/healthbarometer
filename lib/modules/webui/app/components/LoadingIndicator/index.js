import React from 'react';
import _ from 'lodash';

import FaRefresh from 'react-icons/lib/fa/refresh';

class LoadingIndicator extends React.Component {
  render() {
    const { message } = this.props;
    return (
      <div className="loading-indicator__container">
        <div className="loading-indicator__content">
          <div className="loading-indicator__spinner">
            <FaRefresh />
          </div>
          <span>{message}</span>
        </div>
      </div>
    );
  }
}

export default LoadingIndicator;
