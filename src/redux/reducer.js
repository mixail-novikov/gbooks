import { createAction, createReducer } from 'redux-act';

const testAction = createAction('test action');

export default createReducer({
  [testAction]: (state, data) => data,
}, '');
