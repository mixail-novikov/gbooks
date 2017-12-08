import { createReducer } from 'redux-act';

export default listenForAction => createReducer({
  [listenForAction]: (state, { responseTime = 0 }) => responseTime,
}, 0);
