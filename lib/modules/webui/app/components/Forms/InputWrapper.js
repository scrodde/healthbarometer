import React from 'react';
import Formsy from 'formsy-react';
import _ from 'lodash';

import styles from './input.scss';

const InputWrapper = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },

  componentWillMount() {
    const { type } = this.props;
    const defaultValue = (type === 'checkbox') ? undefined : '';
    this.setValue(_.get(this.props, 'defaultValue', defaultValue));
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
    const type = this.props.type || 'text';
    const className = 'form-group ' + type + ' ' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : '') +
      ((this.isFormSubmitted() && !this.isValid())  ? ' error ' : '') +
      (type === 'hidden' ? 'hidden' : '');

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <label htmlFor={this.props.id || this.props.name}>{this.props.title}</label>
        <div className="input-wrapper">
          <input
            id={this.props.id || this.props.name}
            type={type}
            name={this.props.name}
            onBlur={type == 'checkbox' ? null : this.changeValue}
            onChange={this.changeValue}
            value={this.getValue()}
            checked={type === 'checkbox' && this.getValue() ? 'checked' : null}
          />
        </div>
      </div>
    );
  }
});

export default InputWrapper;
