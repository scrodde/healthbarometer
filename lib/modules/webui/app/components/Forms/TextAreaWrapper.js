import React from 'react';
import Formsy from 'formsy-react';
import _ from 'lodash';

import styles from './input.scss';

const TextAreaWrapper = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {
    this.setValue(event.currentTarget['value']);
  },

  componentWillMount() {
    this.setValue(_.get(this.props, 'defaultValue', ''));
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setValue(nextProps.defaultValue);
    }
    return true;
  },

  render() {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = 'form-group' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <div className="input-wrapper">
          <textarea rows="3" name={this.props.name} onChange={this.changeValue} value={this.getValue()}/>
        </div>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default TextAreaWrapper;
