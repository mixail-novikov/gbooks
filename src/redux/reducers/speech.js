import { createAction, createReducer } from 'redux-act';

export const openSpeechPopup = createAction('open speech popup');
export const closeSpeechPopup = createAction('close speech popup');

export const selectSpeechPopup = state => state.speechPopup;

export default createReducer({
  [openSpeechPopup]: () => true,
  [closeSpeechPopup]: () => false,
}, false);
