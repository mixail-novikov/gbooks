import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import { resultsLoaded, setNoResults } from './actions';

const responseTimeReducer = createReducer({
  [resultsLoaded]: (state, { responseTime = 0 }) => responseTime,
}, 0);

const countReducer = createReducer({
  [resultsLoaded]: (state, { totalItems = 0 }) => totalItems,
}, 0);

const noResultsReducer = createReducer({
  [resultsLoaded]: (state, { totalItems = 0 }) => totalItems === 0,
  [setNoResults]: () => true,
}, false);

const currentParamsReducer = createReducer({
  [resultsLoaded]: (state, { currentSearch }) => currentSearch,
  [setNoResults]: (state, currentParams) => currentParams,
}, {});

export default combineReducers({
  responseTime: responseTimeReducer,
  count: countReducer,
  noResults: noResultsReducer,
  currentParams: currentParamsReducer,
});
