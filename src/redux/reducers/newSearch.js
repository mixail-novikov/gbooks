import { createAction, createReducer, batch } from 'redux-act';
import { combineReducers } from 'redux';
import * as qs from 'query-string';
import { get } from 'lodash';

import { take, takeLatest, call, put, select, fork, spawn, cancel, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import axios from 'axios';
import { insertBooks } from './books';

import { push, LOCATION_CHANGE } from 'react-router-redux';

export const startStoreSync = createAction('start store sync');
export const stopStoreSync = createAction('start store sync');

export const runSearch = createAction('run search');

/** TERM **/
export const setSearchTerm = createAction('set search term', (term) => term || '');
const termReducer = createReducer({
  [setSearchTerm]: (state, data) => data,
}, '');
export const selectTerm = (state) => state.newSearch.term;

/** FILTER **/
export const filterDefaultValue = "all";
export const filterMap = [{
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
const allowedFilterValues = filterMap.map(item => item.key);

export const setSearchFilter = createAction('set search filter', (filter) => allowedFilterValues.includes(filter) ? filter : filterDefaultValue);

const filterReducer = createReducer({
  [setSearchFilter]: (state, filter) => filter,
}, filterDefaultValue);

/** PRINT TYPE**/
export const printTypeDefaultValue = "all";
export const printTypeMap = [{
  key: "all",
  value: "Any document",
}, {
  key: "books",
  value: "Books",
}, {
  key: "magazines",
  value: "Magazines",
}]
const allowedPrintTypeValues = printTypeMap.map(item => item.key);

export const setPrintType = createAction('set print type', (printType) => allowedPrintTypeValues.includes(printType) ? printType: printTypeDefaultValue);

const printTypeReducer = createReducer({
  [setPrintType]: (state, printType) => printType,
}, printTypeDefaultValue);

/** SORTING **/
export const sortingDefaultValue = "relevance";
export const sortingMap = [{
  key: "relevance",
  value: "Sorted by relevance",
}, {
  key: "newest",
  value: "Sorted by date",
}]
const allowedSortingValues = sortingMap.map(item => item.key);

export const setSorting = createAction('set sorting', (sorting) => allowedSortingValues.includes(sorting) ? sorting : sortingDefaultValue);

const sortingReducer = createReducer({
  [setSorting]: (state, sorting) => sorting,
}, sortingDefaultValue);

export default combineReducers({
  filter: filterReducer,
  printType: printTypeReducer,
  orderBy: sortingReducer,
  term: termReducer,
});

export function* newSearchSaga() {
  yield spawn(searchSaga);
  yield spawn(runSyncSaga);
}

function* updateSearchStateFromRouter() {
  const search = yield select(state => get(state, 'router.location.search', ''));
  const searchObj = qs.parse(search);
  yield put(batch(
    setSearchFilter.raw(searchObj.fltr),
    setPrintType.raw(searchObj.prnt),
    setSorting.raw(searchObj.srt),
    setSearchTerm.raw(searchObj.trm),
  ));
}

function* updateRouterFromSearchState() {
  const search = yield call(computeSearchString);
  const { location } = yield select(store => store.router.location);
  yield put(push({
    ...location,
    search,
  }));
}

function* computeSearchString() {
  const { filter, orderBy, printType, term } = yield select(state => state.newSearch);
  const search = yield select(state => state.router.location.search);

  const newSearchParams = qs.parse(search);
  if (filter !== filterDefaultValue) {
    newSearchParams['fltr'] = filter;
  } else {
    delete newSearchParams['fltr'];
  }

  if (printType !== printTypeDefaultValue) {
    newSearchParams['prnt'] = printType;
  } else {
    delete newSearchParams['prnt'];
  }

  if (orderBy !== sortingDefaultValue) {
    newSearchParams['srt'] = orderBy;
  } else {
    delete newSearchParams['srt'];
  }

  if (term) {
    newSearchParams['trm'] = term;
  } else {
    delete newSearchParams['trm'];
  }

  return qs.stringify(newSearchParams);
}

function* computeGoogleSearchParams() {
  const { term, filter, orderBy, printType } = yield select(store => store.newSearch);

  if (!term) {
    throw Error('Term is required');
  }

  const params = {
    q: term,
  };

  if (filter !== filterDefaultValue) {
    params['filter'] = filter;
  }

  if (orderBy !== sortingDefaultValue) {
    params['orderBy'] = orderBy;
  }

  if (printType !== printTypeDefaultValue) {
    params['printType'] = printType
  }

  return params;
}

function* syncSaga() {
  try {
    yield takeLatest(LOCATION_CHANGE, updateSearchStateFromRouter);
  } finally {
    if (cancelled()) {
      console.log('task cancelled');
    }
  }
}

function* runSyncSaga() {
  while (yield take(startStoreSync.getType())) {
    yield call(updateSearchStateFromRouter);
    const syncId = yield fork(syncSaga);
    yield take(stopStoreSync.getType());
    yield cancel(syncId);
  }
}

function* searchSaga() {
  while (yield take(runSearch.getType())) {
    yield call(updateRouterFromSearchState);
    try {
      const params = yield call(computeGoogleSearchParams)
      const resp = yield call(axios, 'https://www.googleapis.com/books/v1/volumes', {params});
      yield put(insertBooks(resp.data.items));
    } catch (e) {
      console.log(e);
    }
  }
}
