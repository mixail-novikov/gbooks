import { createReducer } from 'redux-act';

export default listenForAction => createReducer({
  [listenForAction]: (state, { totalItems = 0 }) => Number(totalItems),
}, 0);
