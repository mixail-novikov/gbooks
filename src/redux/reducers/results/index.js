import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

import * as actions from './actions';
import * as selectors from './selectors';

export { actions, selectors };

const responseTimeReducer = createReducer({
  [actions.resultsLoaded]: (state, { responseTime = 0 }) => responseTime,
}, 0);

const countReducer = createReducer({
  [actions.resultsLoaded]: (state, { totalItems = 0 }) => totalItems,
}, 0);

const noResultsReducer = combineReducers({
  status: createReducer({
    [actions.resultsLoaded]: (state, { count = 0 }) => count === 0,
    [actions.setNoResults]: () => true,
  }, false),
  term: createReducer({
    [actions.setNoResults]: (state, term) => term,
  }, ''),
});

export default combineReducers({
  responseTime: responseTimeReducer,
  count: countReducer,
  noResults: noResultsReducer,
});
