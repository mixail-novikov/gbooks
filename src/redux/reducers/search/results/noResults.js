import { createAction, createReducer } from 'redux-act';
import { combineReducers } from 'redux';

export const setNoResults = createAction('set no results');

export default listenForAction => combineReducers({
  status: createReducer({
    [listenForAction]: (state, { count = 0 }) => count === 0,
    [setNoResults]: state => true,
  }, false),
  term: createReducer({
    [setNoResults]: (state, term) => term,
  }, ''),
});
