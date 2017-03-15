import React from 'react';
import { Link } from 'react-router-dom';

class NoMatch extends React.Component {
  render() {
    return (
      <div className="thankyou">
        <h1 className="page-title">404 ;(</h1>
        <div className="page-content">
          <p>You sire are lost.</p>
          <p><Link to="/" className="button">Start over</Link></p>
        </div>
      </div>
    );
  }
}

export default NoMatch;
