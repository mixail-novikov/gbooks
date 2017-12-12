import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import { setFilterPanelVisibility } from './actions';
import { resultsLoaded } from '../search';

const filterPanelVisibleReducer = createReducer({
  [setFilterPanelVisibility]: (state, value) => value,
}, false);

const filterPanelTouchedReducer = createReducer({
  [setFilterPanelVisibility]: () => true,
  [resultsLoaded]: () => false,
}, false);

const filterPanelReducer = combineReducers({
  visible: filterPanelVisibleReducer,
  touched: filterPanelTouchedReducer,
});
