import React from 'react';
import Formsy from 'formsy-react';
import _ from 'lodash';

import styles from './input.scss';

const RadioGroup = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(value) {
    this.setValue(value);
  },

  // componentWillMount() {
  //   const { type } = this.props;
  //   const defaultValue = (type === 'checkbox') ? false : '';
  //   this.setValue(_.get(this.props, 'defaultValue', defaultValue));
  // },
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.defaultValue !== this.props.defaultValue) {
  //     this.setValue(nextProps.defaultValue);
  //   }
  //   return true;
  // },

  render() {
    const className = 'form-group radio' + (this.props.className || ' ') +
      (this.showRequired() ? ' required ' : '') +
      ((this.isFormSubmitted() && !this.isValid())  ? ' error ' : '');

    console.log()

    const errorMessage = this.getErrorMessage();

    const items = _.map([1,2,3,4,5,6], (val) => {
      const className = this.getValue() === val ? 'radio__scale__item active' : 'radio__scale__item';
      const mark = this.getValue() === val ? <div className="radio__scale__item__input_mark"></div> : null;
      return (
        <div className={className} key={val}>
          <div className="radio__scale__item__label">{val}</div>
          <div className="radio__scale__item__input" onClick={this.changeValue.bind(this, val)}>
            {mark}
          </div>
        </div>
      );
    });

    const dunnoClass = this.getValue() === 0 ? 'radio__dunno_wrapper active' : 'radio__dunno_wrapper';
    const dunno = this.getValue() === 0 ? <div className="radio__scale__item__input_mark"></div> : null;

    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
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
                <div className="radio__scale__item__input" onClick={this.changeValue.bind(this, 0)}>
                  {dunno}
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default RadioGroup;
