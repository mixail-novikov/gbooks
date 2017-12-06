import { createAction, createReducer } from 'redux-act';

export const startLoading = createAction('start loading');
export const finishLoading = createAction('finish loading');

export default createReducer({
  [startLoading]: () => true,
  [finishLoading]: () => false,
}, false);
