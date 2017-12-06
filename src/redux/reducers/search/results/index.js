import { combineReducers } from 'redux';

import createResponseTimeReducer from './responseTime';
import createCountReducer from './count';
import createNoResultsReducer, { setNoResults } from './noResults';

import * as selectors from './selectors';

export { setNoResults, selectors };

export default (listenForAction) => combineReducers({
  responseTime: createResponseTimeReducer(listenForAction),
  count: createResponseTimeReducer(listenForAction),
  noResults: createNoResultsReducer(listenForAction),
});
