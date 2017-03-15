import React from 'react';
import Formsy from 'formsy-react';
import _ from 'lodash';

import styles from './input.scss';

const FieldWrapper = React.createClass({

  mixins: [Formsy.Mixin],

  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type == 'checkbox' ? 'checked' : 'value']);
  },

  changeCheckboxValue(event) {
    let currentValue = this.getValue();
    if (!_.isArray(currentValue)) { currentValue = [] }

    if (event.currentTarget['checked']) {
      currentValue.push(event.currentTarget['value']);
    } else {
      const ix = _.indexOf(currentValue, event.currentTarget['value']);
      if (ix >= 0) {
        currentValue.splice(ix, 1);
        if (currentValue.length === 0) {
          currentValue = undefined;
        }
      }
    }
    this.setValue(currentValue);
  },

  changeRadioValue(val) {
    this.setValue(val);
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

  input(type, id, title) {
    const className = 'form-group ' + type + ' ' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : '') +
      (type === 'hidden' ? 'hidden' : '');

    return (
      <div className={className} key={id}>
        <label htmlFor={id || this.props.id || this.props.name}>{title || this.props.title}</label>
        <div className="input-wrapper">
          <input
            id={id || this.props.id || this.props.name}
            type={type || 'text'}
            name={this.props.name}
            onChange={this.changeValue}
            value={this.getValue()}
            checked={type === 'checkbox' && this.getValue() ? 'checked' : null}
          />
        </div>
      </div>
    );
  },

  checkbox(id, name, title) {
    const className = 'form-group checkbox' + ' ' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : '');

    const checked = _.indexOf(this.getValue(), title) > -1 ? 'checked' : '';

    return (
      <div className={className} key={id}>
        <label htmlFor={id}>{title}</label>
        <div className="input-wrapper">
          <input
            id={id}
            type="checkbox"
            name={name}
            onChange={this.changeCheckboxValue}
            checked={checked}
            value={title}
          />
        </div>
      </div>
    );
  },

  radioInput() {
    const className = 'form-group radio' + (this.props.className || ' ') +
      (this.showRequired() ? ' required ' : '');

    const items = _.map([1,2,3,4,5,6], (val) => {
      const className = this.getValue() === val ? 'radio__scale__item active' : 'radio__scale__item';
      const mark = this.getValue() === val ? <div className="radio__scale__item__input_mark"></div> : null;
      return (
        <div className={className} key={val}>
          <div className="radio__scale__item__label">{val}</div>
          <div className="radio__scale__item__input" onClick={this.changeRadioValue.bind(this, val)}>
            {mark}
          </div>
        </div>
      );
    });

    const dunnoClass = this.getValue() === 0 ? 'radio__dunno_wrapper active' : 'radio__dunno_wrapper';
    const dunno = this.getValue() === 0 ? <div className="radio__scale__item__input_mark"></div> : null;

    return (
      <div className={className}>
        <div className="input-wrapper">
          <div>
            <div className="radio__titles">
              <span>Strongly Agree</span>
              <span>Strongly Disagree</span>
            </div>
            <div className="radio__scale">{items}</div>
          </div>
          <div className={dunnoClass}>
            <div className="radio__titles">
              <span>Don't know</span>
            </div>
            <div className="radio__scale">
              <div className="radio__scale__item">
                <div className="radio__scale__item__label"></div>
                <div className="radio__scale__item__input" onClick={this.changeRadioValue.bind(this, 0)}>
                  {dunno}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  render() {
    const { children, id, num, name, type, title, className, options } = this.props;

    const classes = 'field-wrapper ' + type + ' ' + (className || ' ') +
      (this.showRequired() ? 'required' : '') +
      ((this.isFormSubmitted() && !this.isValid())  ? ' error ' : '') +
      (type === 'hidden' ? 'hidden' : '');

    const errorMessage = this.getErrorMessage();

    let field = null;
    if (type == 'text') { field = this.input(type); }
    if (type == 'radio') { field = this.radioInput(); }
    if (type == 'checkbox') {
      field = _.map(options, (option, ix) => {
        return this.checkbox(`${name}o${ix}`, name, option)
      });
    }

    return (
      <div className={classes}>
        <div className="field-title">{num}. {title}</div>
        <div className="field-content">
          {field}
          <span className='validation-error'>{errorMessage}</span>
        </div>
        <div className="field-extras">
          {children}
        </div>
      </div>
    );
  }
});

export default FieldWrapper;
