import { createAction, createReducer, batch } from 'redux-act';
import { combineReducers } from 'redux';
import * as qs from 'query-string';
import { get } from 'lodash';

import { take, takeLatest, call, put, select, fork, spawn, cancel, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { push, LOCATION_CHANGE } from 'react-router-redux';
import { runSearch as oldRunSearch } from './search';

export const startStoreSync = createAction('start store sync');
export const stopStoreSync = createAction('start store sync');


export const runSearch = createAction('run search');

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
  const { filter, orderBy, printType } = yield select(state => state.newSearch);
  const newSearchParams = {};
  if (filter !== filterDefaultValue) {
    newSearchParams['fltr'] = filter;
  }

  if (printType !== printTypeDefaultValue) {
    newSearchParams['prnt'] = printType;
  }

  if (orderBy !== sortingDefaultValue) {
    newSearchParams['srt'] = orderBy;
  }

  return qs.stringify(newSearchParams);
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
  while (true) {
    yield take([runSearch.getType(), oldRunSearch.getType()]);
    yield call(updateRouterFromSearchState);
  }
}
