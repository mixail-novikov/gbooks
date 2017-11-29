import * as filterStuff from './filter';
import * as termStuff from './term';
import * as printTypeStuff from './printType';
import * as sortingStuff from './sorting';

import { createAction, createReducer, batch } from 'redux-act';
import { combineReducers } from 'redux';
import * as qs from 'query-string';
import { get } from 'lodash';

import { takeLatest, call, put, select } from 'redux-saga/effects';

import axios from 'axios';

import { push, LOCATION_CHANGE } from 'react-router-redux';
import { matchPath } from 'react-router';

export { filterStuff as filter, termStuff as term, printTypeStuff as printType, sortingStuff as sorting };

export const startStoreSync = createAction('start store sync');
export const stopStoreSync = createAction('start store sync');

export const runSearch = createAction('run search');

export const resultsLoaded = createAction('results loaded');

const responseTimeReducer = createReducer({
  [resultsLoaded]: (state, {responseTime=0}) => responseTime,
}, 0);
export const selectResponseTime = (state) => state.newSearch.results.responseTime;

const resultsCountReducer = createReducer({
  [resultsLoaded]: (state, {count=0}) => count,
}, 0);
export const selectResultsCount = (state) => state.newSearch.results.resultsCount;

const setNoResults = createAction('set no results');

const noResultsStatusReducer = createReducer({
  [resultsLoaded]: (state, {count=0}) => count === 0,
  [setNoResults]: (state) => true,
}, false);

export const selectNoResultsStatus = (state) => state.newSearch.results.noResults.status;

const noResultsTermReducer = createReducer({
  [setNoResults]: (state, term) => term,
}, '');

export const selectNoResultsTerm = (state) => state.newSearch.results.noResults.term;

const noResultsReducer = combineReducers({
  status: noResultsStatusReducer,
  term: noResultsTermReducer,
})

const resultsReducer = combineReducers({
  responseTime: responseTimeReducer,
  resultsCount: resultsCountReducer,
  noResults: noResultsReducer,
});

const startLoading = createAction('start loading');
const finishLoading = createAction('finish loading');

const loadingReducer = createReducer({
  [startLoading]: () => true,
  [finishLoading]: () => false,
}, false);

export const selectLoadingStatus = (state) => state.newSearch.loading;

export default combineReducers({
  filter: filterStuff.reducer,
  printType: printTypeStuff.reducer,
  orderBy: sortingStuff.reducer,
  term: termStuff.reducer,
  results: resultsReducer,
  loading: loadingReducer,
});

export const goToSearchPage = createAction('go to search page');

export function* newSearchSaga() {
  yield takeLatest(LOCATION_CHANGE, updateSearchStateFromRouter);
  yield takeLatest(LOCATION_CHANGE, performSearch);
  yield takeLatest(runSearch.getType(), updateRouterFromSearchState);
  yield takeLatest(goToSearchPage.getType(), goToSearchPageSaga);
}

export function* isSearchPage() {
  try {
    const pathname = yield select(state => state.router.location.pathname);
    const { isExact } = matchPath(pathname, {path: '/search'});
    return isExact;
  } catch (e) {
    return false;
  }
}

function* updateSearchStateFromRouter({payload}) {
  if (!(yield call(isSearchPage))) {
    return;
  }

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

function* goToSearchPageSaga() {
  yield put(push({
    pathname: '/search',
    search: yield call(computeSearchString),
  }))
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

let lastParamsStr;
function* performSearch() {
  if (!(yield call(isSearchPage))) {
    return;
  }

  const term = yield select(termStuff.select);
  console.log('term', term);
  const params = yield call(computeGoogleSearchParams);
  // TODO: подумать о другом способе
  const paramsStr = JSON.stringify(params);
  if (paramsStr === lastParamsStr) {
    return;
  }
  let startTime = Date.now();
  yield put(startLoading());

  let resp;
  try {
    resp = yield call(axios, 'https://www.googleapis.com/books/v1/volumes', {params});
  } catch (e) {
    yield put(setNoResults(term));
    return;
  } finally {
    yield put(finishLoading());
    lastParamsStr = paramsStr;
  }

  const items = get(resp, 'data.items', []);

  if (items.length) {
    // TODO на один экшен навесть несколько редьюсеров
    yield put(resultsLoaded({
      items,
      count: get(resp, 'data.totalItems'),
      responseTime: Date.now() - startTime,
    }));
  } else {
    yield put(setNoResults(term));
  }
}
