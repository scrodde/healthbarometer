import React from 'react';
import Formsy from 'formsy-react';

import LoadingIndicator from '../LoadingIndicator';
import InputWrapper from './InputWrapper';
import FieldWrapper from './FieldWrapper';
import RadioGroup from './RadioGroup';
import TextAreaWrapper from './TextAreaWrapper';
import { Redirect } from 'react-router-dom';

let fieldCount = 0;

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.renderSection.bind(this);
    this.renderChild.bind(this);
    this.renderFormSection.bind(this);
    this.renderForm.bind(this);
    this.step.bind(this);
    this.saveEntry.bind(this);
    this.state = {
      didInvalidSubmit: false,
    }
  }

  renderSection(section, depth = 0) {
    const fields = _.map(section.children, (child) => {
      return this.renderChild(child, depth + 1);
    });
    return (
      <div key={btoa(section.title)} className={`section section-${depth}`}>
        <div className="section-header"><h2>{section.title}</h2></div>
        <div className="section-content">{fields}</div>
      </div>
    );
  }

  renderChild(child, depth=0) {
    if (child.type === 'section') {
      return this.renderSection(child, depth);
    } else {
      fieldCount++;
      const name = `q${fieldCount}`;
      const commentsName = `q${fieldCount}c`;
      const required = child.type == 'text' ? false : true;
      const defaultValue   = _.get(this.props.currentEntry, name);
      const defaultComment = _.get(this.props.currentEntry, commentsName);
      return (
        <FieldWrapper defaultValue={defaultValue} num={fieldCount} key={name} title={child.title} name={name} type={child.type} options={child.options} required={required}>
          <div className="field-comments">
            <div className="field-comments__title">Comments (Optional)</div>
            <div className="field-comments__input_wrapper">
              <TextAreaWrapper name={commentsName} defaultValue={defaultComment}/>
            </div>
          </div>
        </FieldWrapper>
      );
    }
  }

  renderFormSection(section) {
    return <div className="form-content">{this.renderChild(section)}</div>
  }

  renderForm(structure) {
    const sections = _.map(structure, (node) => {
      return this.renderChild(node);
    });
    return <div>{sections}</div>
  }

  componentWillMount() {
    this.props.loadData();
  }

  enableButton() {
    this.setState({
      canSubmit: true,
      didInvalidSubmit: false,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  saveEntry(partial) {
    const { currentEntry } = this.props;
    const entry = Object.assign({}, currentEntry, partial);
    this.props.saveEntry(entry);
  }

  step(amount) {
    window.scrollTo(0, 0);
    // Save progress before going back
    if (amount < 0) {
      this.saveEntry(this.form.getModel());
    }
    let step = Math.max(0, Math.min(this.props.currentStep + amount, this.props.totalSteps - 1));
    this.props.step(step);
  }

  submit(model) {
    window.scrollTo(0, 0);
    const { currentEntry, currentStep, totalSteps } = this.props;

    this.saveEntry(model);
    if (currentStep < totalSteps - 1 ) {
      this.step(1);
    } else {
      const entry = Object.assign({}, currentEntry, model);
      this.props.submitEntry(entry);
    }
  }

  onInvalidSubmit(model) {
    this.setState({
      didInvalidSubmit: true,
    });
  }

  render() {
    fieldCount = 0;
    const { didInvalidSubmit } = this.state;
    const { isLoading, isSubmitting, isError, structure, name, currentStep, totalSteps, progress, completed } = this.props;

    if (completed) {
      return <Redirect to="/thankyou" />;
    }

    // const currentSection = _.get(structure, `[${currentStep}]`);
    // const formContent = currentSection ? renderFormSection(currentSection) : null;

    const formContent = !isLoading ? _.get(this.renderForm(structure), `props.children[${currentStep}]`) : null;
    const loader = isLoading ? <LoadingIndicator message="Loading form..."/> : null;
    const submitter = isSubmitting ? <LoadingIndicator message="Submitting form..."/> : null;
    const backBtn = currentStep > 0 ? <a onClick={this.step.bind(this, -1)} className="button">Back</a>  : <div />;
    const submitTitle = (currentStep === totalSteps - 1) ? 'Submit' : 'Next';
    const errorMessage = didInvalidSubmit ? <div className="form__errors">Please correct the errors above.</div> : null;

    return (
      <Formsy.Form onInvalidSubmit={this.onInvalidSubmit.bind(this)} onValidSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this)}
        onInvalid={this.disableButton.bind(this)} className="form"
        ref={(form) => { this.form = form; }}>

        {loader}
        {submitter}

        <div className="page-title">
          <h1>Health Barometer Survey</h1>
          <div className="form__progress__container">
            <span>{progress}</span>
          </div>
        </div>

        <div className="formContent">
          {formContent}
          <InputWrapper name="formName" value={name} type="hidden" />
        </div>

        <div className="actions">
          {backBtn}
          <input type="submit" className={'button submit submit-'+submitTitle.toLowerCase()} value={submitTitle} />
        </div>
        {errorMessage}
      </Formsy.Form>
    );
  }
}

export default Form;
