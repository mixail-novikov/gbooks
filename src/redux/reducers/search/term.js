import { createAction, createReducer } from 'redux-act';

export const set = createAction('set search term', (term) => term || '');

export const reducer = createReducer({
  [set]: (state, data) => data,
}, '');

export const select = (state) => state.newSearch.term;
