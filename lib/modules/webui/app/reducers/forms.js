import _ from 'lodash';
import {
  LOAD_FORM,
  LOAD_FORM_SUCCESS,
  LOAD_FORM_FAILURE,
} from '../actions';

const forms = (state = {}, action) => {
  let newState = state;
  switch (action.type) {
    case LOAD_FORM:
      newState[action.id] = {
        isLoading: true,
      };
      return Object.assign({}, newState);
    case LOAD_FORM_SUCCESS:
      newState[action.form.id] = _.assign({
        isLoading: false,
      }, action.form);
      return Object.assign({}, newState);
    case LOAD_FORM_FAILURE:
      console.log(action);
      newState[action.id] = {
        isLoading: false,
        isError: true,
      };
      return Object.assign({}, newState);
    default:
      return state;
  }
}

export default forms;
