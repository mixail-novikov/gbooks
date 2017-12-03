import { createAction, createReducer } from 'redux-act';
import { items, defaultValue } from '../../../enums/sorting';

export { items, defaultValue};

const allowedValues = items.map(item => item.key);
export const set = createAction('set sorting', (input) => allowedValues.includes(input) ? input : defaultValue);

export const select = (state) => state.newSearch.orderBy;

export const reducer = createReducer({
  [set]: (state, sorting) => sorting,
}, defaultValue);
