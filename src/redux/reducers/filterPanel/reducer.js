import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import { resultsLoaded } from '../results';
import { setFilterPanelVisibility } from './actions';

const filterPanelVisibleReducer = createReducer({
  [setFilterPanelVisibility]: (state, value) => value,
}, false);

const filterPanelTouchedReducer = createReducer({
  [setFilterPanelVisibility]: () => true,
  [resultsLoaded]: () => false,
}, false);

export default combineReducers({
  visible: filterPanelVisibleReducer,
  touched: filterPanelTouchedReducer,
});
