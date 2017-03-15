import _ from 'lodash';
import { connect } from 'react-redux';

import { loadForm, entryStep, entrySave, entrySubmit } from '../actions';
import Form from '../components/Forms/Form';

const fieldCount = (form) => {
  if (_.isArray(form)) {
    return _.reduce(form, (result, node) => {
      return result + fieldCount(node);
    }, 0)
  } else {
    if (_.has(form, 'children')) {
      return fieldCount(form.children);
    } else {
      return 1;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { entries, forms } = state;
  const id = _.get(ownProps, 'match.params.id');
  const form = forms[id] || {};
  const isSubmitting = _.get(entries, 'isSubmitting', false);
  const completed    = _.get(entries, 'completed', false);
  const currentEntry = _.get(entries, 'currentEntry', {});
  const totalFields  = fieldCount(_.get(form, 'structure'));
  const progress = parseInt((((_.keys(currentEntry).length / 2) / totalFields) * 100.0)) + '%';

  return Object.assign({}, form, {
    currentStep: entries.currentStep || 0,
    totalSteps: _.get(form, 'structure.length', 1),
    structure: _.get(form, 'structure'),
    currentEntry,
    progress,
    totalFields,
    completed,
  });
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = _.get(ownProps, 'match.params.id');
  return {
    loadData: () => {
      dispatch(loadForm(id));
    },
    step: (step) => {
      dispatch(entryStep(step));
    },
    saveEntry: (entry) => {
      dispatch(entrySave(entry));
    },
    submitEntry: (entry) => {
      dispatch(entrySubmit(entry));
    }
  }
}

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

export default FormContainer
