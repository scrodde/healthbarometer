import _ from 'lodash';
import {
  ENTRY_STEP,
  ENTRY_RESTORE,
  ENTRY_CLEAR,
  ENTRY_SAVE,
  ENTRY_SUBMIT,
  ENTRY_SUBMIT_SUCCESS,
  ENTRY_SUBMIT_FAILURE,
} from '../actions';

const entries = (state = {}, action) => {
  let newState = state;
  switch (action.type) {
    case ENTRY_STEP:
      return Object.assign({}, newState, {
        currentStep: action.step,
      });
    case ENTRY_RESTORE:
      return Object.assign({}, newState, {
        currentEntry: Object.assign({}, action.entry),
      });
    case ENTRY_CLEAR:
      return {
        currentEntry: {},
      };
    case ENTRY_SAVE:
      return Object.assign({}, newState, {
        currentEntry: Object.assign({}, action.entry),
      });
    case ENTRY_SUBMIT:
    return Object.assign({}, newState, {
      isSubmitting: true,
    });
    case ENTRY_SUBMIT_SUCCESS:
      return Object.assign({}, newState, {
        isSubmitting: false,
        completed: true,
      });
    case ENTRY_SUBMIT_FAILURE:
      return Object.assign({}, newState, {
        isSubmitting: false,
        completed: false,
        error: true,
      });
    default:
      return state;
  }
}

export default entries;
