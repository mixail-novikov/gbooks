import { createAction, createReducer } from 'redux-act';

export const defaultValue = "all";
export const items = [{
  key: "all",
  value: "Any document",
}, {
  key: "books",
  value: "Books",
}, {
  key: "magazines",
  value: "Magazines",
}]

const allowedValues = items.map(item => item.key);
export const set = createAction('set printType', (input) => allowedValues.includes(input) ? input : defaultValue);

export const select = (state) => state.newSearch.printType;

export const reducer = createReducer({
  [set]: (state, filter) => filter,
}, defaultValue);
