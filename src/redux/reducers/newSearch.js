import { createAction, createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import * as qs from 'query-string';

import { take, put, select, fork } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';

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

export const setSearchFilter = createAction('set search filter', (filter) => allowedFilterValues.includes(filter) ? filter : '');

const filterReducer = createReducer({
  [setSearchFilter]: (state, filter) => filter,
}, '');

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

export const setPrintType = createAction('set print type', (printType) => allowedPrintTypeValues.includes(printType) ? printType: '');

const printTypeReducer = createReducer({
  [setPrintType]: (state, printType) => printType,
}, '');

/** SORTING **/
export const sortingDefaultValue = "relevance";
export const sortingMap = [{
  key: "relevance",
  value: "Sorted by relevance",
}, {
  key: "newest",
  value: "Sorted by date",
}]
const allowedSortingValues = Object.keys(sortingMap);

export const setSorting = createAction('set sorting', (sorting) => allowedSortingValues.includes(sorting) ? sorting : '');

const sortingReducer = createReducer({
  [setSorting]: (state, sorting) => sorting,
}, '');

export default combineReducers({
  filter: filterReducer,
  printType: printTypeReducer,
  orderBy: sortingReducer,
});

export function* newSearchSaga() {
  yield fork(searchSaga);
}

function* searchSaga() {
  while (true) {
    yield take(runSearch.getType());
    const [searchObj, location] = yield select(state => ([state.newSearch, state.router.location]));
    yield put(push({
      ...location,
      search: qs.stringify(searchObj),
    }))
  }
}
