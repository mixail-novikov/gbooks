import { createAction, createReducer } from 'redux-act';

export const defaultValue = "all";
export const items = [{
  key: "all",
  value: "Any books",
}, {
  key: "partial",
  value: "Preview available"
}, {
  key: "ebooks",
  value: "Google eBooks"
}, {
  key: "free-ebooks",
  value: "Free Google eBooks"
},];

const allowedValues = items.map(item => item.key);
export const set = createAction('set search filter', (input) => allowedValues.includes(input) ? input : defaultValue);

export const select = (state) => state.newSearch.filter;

export const reducer = createReducer({
  [set]: (state, filter) => filter,
}, defaultValue);
