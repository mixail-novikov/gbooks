import { createAction, createReducer } from 'redux-act';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

const testAction = createAction('TEST_ACTION');
const testReducer = createReducer({
  [testAction]: (state, data) => data,
}, '');

export default combineReducers({
  test: testReducer,
  router: routerReducer,
})
