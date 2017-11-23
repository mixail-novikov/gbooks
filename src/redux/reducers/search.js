import { createAction, createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import { get } from 'lodash';
import { push } from 'react-router-redux';
import { put, take, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { insertBooks } from './books';

/*
Actions
*/
export const setSearchTerm = createAction('set search term');
export const runSearch = createAction('run search');
const searchIsFinished = createAction('search is finished');

/*
Reducers
*/
const termReducer = createReducer({
  [setSearchTerm]: (state, data) => data,
}, '');

const loadingReducer = createReducer({
  [runSearch]: () => true,
  [searchIsFinished]: () => false,
}, false);

export default combineReducers({
  term: termReducer,
  loading: loadingReducer
});

/*
Selectors
*/
export const selectTerm = (state) => get(state, 'search.term');
export const selectLoading = (state) => get(state, 'search.loading');

export function* searchSaga() {
  while (true) {
    yield take(runSearch.getType());
    const term = yield select(selectTerm);

    try {
      const resp = yield call(axios, 'https://www.googleapis.com/books/v1/volumes', {params: {q: term}});
      yield put(insertBooks(resp.data.items));
      yield put(push({
        pathname: '/search',
        search: `q=${encodeURIComponent(term)}`
      }));
    } catch (e) {
      console.log(e);
    }
  }
}
