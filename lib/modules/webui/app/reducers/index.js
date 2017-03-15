import { combineReducers } from 'redux';
import auth from './auth';
import config from './config';
import entries from './entries';
import forms from './forms';


export default combineReducers({
  auth,
  config,
  forms,
  entries,
});
