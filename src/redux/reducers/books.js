import { createAction, createReducer } from 'redux-act';

export const insertBooks = createAction('insert books');

export default createReducer({
  [insertBooks]: (state, books) => books,
}, []);

export const selectBooks = (state) => state.books;
