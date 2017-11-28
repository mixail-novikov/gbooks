import { createAction, createReducer } from 'redux-act';

export const defaultValue = "relevance";
export const items = [{
  key: "relevance",
  value: "Sorted by relevance",
}, {
  key: "newest",
  value: "Sorted by date",
}];

const allowedValues = items.map(item => item.key);
export const set = createAction('set sorting', (input) => allowedValues.includes(input) ? input : defaultValue);

export const select = (state) => state.newSearch.orderBy;

export const reducer = createReducer({
  [set]: (state, sorting) => sorting,
}, defaultValue);
