import React from 'react';
import { Link } from 'react-router-dom';

class ThankYou extends React.Component {
  render() {
    return (
      <div className="thankyou">
        <h1 className="page-title">Thank you!</h1>
        <div className="page-content">
          <p>Your answers have now been submitted.</p>
          <p><Link to="/" className="button submit">New Submission</Link></p>
        </div>
      </div>
    );
  }
}

export default ThankYou;
