import { createAction, createReducer } from 'redux-act';
import { items, defaultValue } from '../../../enums/printType';

export { items, defaultValue};

const allowedValues = items.map(item => item.key);
export const set = createAction('set printType', (input) => allowedValues.includes(input) ? input : defaultValue);

export const select = (state) => state.newSearch.printType;

export const reducer = createReducer({
  [set]: (state, filter) => filter,
}, defaultValue);
