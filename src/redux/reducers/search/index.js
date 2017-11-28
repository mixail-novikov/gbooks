import * as filterStuff from './filter';
import * as termStuff from './term';
import * as printTypeStuff from './printType';
import * as sortingStuff from './sorting';


import { createAction, createReducer, batch } from 'redux-act';
import { combineReducers } from 'redux';
import * as qs from 'query-string';
import { get } from 'lodash';

import { take, takeLatest, call, put, select, fork, spawn, cancel, cancelled } from 'redux-saga/effects';

import axios from 'axios';
import { insertBooks } from '../books';

import { push, LOCATION_CHANGE } from 'react-router-redux';

export { filterStuff as filter, termStuff as term, printTypeStuff as printType, sortingStuff as sorting };

export const startStoreSync = createAction('start store sync');
export const stopStoreSync = createAction('start store sync');

export const runSearch = createAction('run search');

export default combineReducers({
  filter: filterStuff.reducer,
  printType: printTypeStuff.reducer,
  orderBy: sortingStuff.reducer,
  term: termStuff.reducer,
});

export function* newSearchSaga() {
  yield spawn(searchSaga);
  yield spawn(runSyncSaga);
}

function* updateSearchStateFromRouter() {
  const search = yield select(state => get(state, 'router.location.search', ''));
  const searchObj = qs.parse(search);
  yield put(batch(
    filterStuff.set.raw(searchObj.fltr),
    printTypeStuff.set.raw(searchObj.prnt),
    sortingStuff.set.raw(searchObj.srt),
    termStuff.set.raw(searchObj.trm),
  ));
}

function* updateRouterFromSearchState() {
  const search = yield call(computeSearchString);
  const { location } = yield select(store => get(store, 'router.location', ''));
  yield put(push({
    ...location,
    search,
  }));
}

function* selectSearchState() {
  return yield select(state => ({
    filter: filterStuff.select(state),
    orderBy: sortingStuff.select(state),
    printType: printTypeStuff.select(state),
    term: termStuff.select(state),
  }));
}

function* computeSearchString() {
  const { filter, orderBy, printType, term } = yield call(selectSearchState);
  const search = yield select(state => get(state, 'router.location.search'));

  const newSearchParams = qs.parse(search);
  if (filter !== filterStuff.defaultValue) {
    newSearchParams['fltr'] = filter;
  } else {
    delete newSearchParams['fltr'];
  }

  if (printType !== printTypeStuff.defaultValue) {
    newSearchParams['prnt'] = printType;
  } else {
    delete newSearchParams['prnt'];
  }

  if (orderBy !== sortingStuff.defaultValue) {
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
  const { term, filter, orderBy, printType } = yield call(selectSearchState);

  if (!term) {
    throw Error('Term is required');
  }

  const params = {
    q: term,
  };

  if (filter !== filterStuff.defaultValue) {
    params['filter'] = filter;
  }

  if (orderBy !== sortingStuff.defaultValue) {
    params['orderBy'] = orderBy;
  }

  if (printType !== printTypeStuff.defaultValue) {
    params['printType'] = printType;
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
