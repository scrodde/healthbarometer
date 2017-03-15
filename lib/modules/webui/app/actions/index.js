import axios from 'axios';
import { api } from '../lib/api';

export const LOAD_FORM          = 'LOAD_FORM';
export const LOAD_FORM_SUCCESS  = 'LOAD_FORM_SUCCESS';
export const LOAD_FORM_FAILURE  = 'LOAD_FORM_FAILURE';

export const ENTRY_STEP     = 'ENTRY_STEP';
export const ENTRY_SAVE     = 'ENTRY_SAVE';
export const ENTRY_CLEAR    = 'ENTRY_CLEAR';
export const ENTRY_RESTORE  = 'ENTRY_RESTORE';

export const ENTRY_SUBMIT         = 'ENTRY_SUBMIT';
export const ENTRY_SUBMIT_SUCCESS = 'ENTRY_SUBMIT_SUCCESS';
export const ENTRY_SUBMIT_FAILURE = 'ENTRY_SUBMIT_FAILURE';

export const AUTH_SIGNIN          = 'AUTH_SIGNIN';
export const AUTH_SIGNIN_SUCCESS  = 'AUTH_SIGNIN_SUCCESS';
export const AUTH_SIGNIN_FAILURE  = 'AUTH_SIGNIN_FAILURE';
export const AUTH_SIGNOUT         = 'AUTH_SIGNOUT';
export const AUTH_ERROR           = 'AUTH_ERROR';

export const loadForm = (id) => {
  return (dispatch) => {
    dispatch({ type: LOAD_FORM, id });
    api.formsGet(id)
      .then(response => {
        const form = response.data;
        dispatch({ type: LOAD_FORM_SUCCESS, form });
      })
      .catch(error => {
        dispatch({ type: LOAD_FORM_FAILURE, id, error });
      })
  };
}

export const entryStep = (amount) => {
  return {
    type: ENTRY_STEP,
    step: parseInt(amount),
  };
}

export const entrySave = (entry) => {
  window.localStorage.setItem('entry', JSON.stringify(entry));
  return {
    type: ENTRY_SAVE,
    entry: entry,
  };
}

export const entryRestore = () => {
  const entry = JSON.parse(window.localStorage.getItem('entry'));
  return {
    type: ENTRY_RESTORE,
    entry: entry,
  };
}

export const entryClear = () => {
  window.localStorage.removeItem('entry');
  return {
    type: ENTRY_CLEAR,
    entry: {},
  };
}

export const entrySubmit = (entry) => {
  return (dispatch) => {
    dispatch({ type: ENTRY_SUBMIT, entry });
    api.entriesCreate(entry)
      .then(response => {
        const entry = response.data;
        dispatch({ type: ENTRY_SUBMIT_SUCCESS, entry });
        dispatch(entryClear());
      })
      .catch(error => {
        dispatch({ type: ENTRY_SUBMIT_FAILURE, error });
      })
  };
}

/**
 * AUTH
 *
 */
export function signOut() {
  api.setToken(null);
  window.localStorage.removeItem('token');
  return { type: AUTH_SIGNOUT };
}

export function signIn(token = null) {
  return (dispatch) => {
    dispatch({ type: AUTH_SIGNIN });
    api.usersMe()
      .then(response => {
        window.localStorage.setItem('token', token);
        dispatch({ type: AUTH_SIGNIN_SUCCESS, user: response.data });
      })
      .catch(error => {
        window.localStorage.removeItem('token');
        dispatch({ type: AUTH_SIGNIN_FAILURE, error })
      });
  };
}

export function authError(message) {
  api.setToken(null);
  window.localStorage.removeItem('token');
  return {
      type: AUTH_ERROR,
      error: message,
  };
}
