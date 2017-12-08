import { createAction, createReducer, batch } from 'redux-act';
import { combineReducers } from 'redux';
import * as qs from 'query-string';
import { get, flow, mapValues, reduce } from 'lodash';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import { push, LOCATION_CHANGE } from 'react-router-redux';
import { matchPath } from 'react-router';

import { loadBooks } from '../../../api';

import * as selectors from './selectors';

import {
  filter as filterEnum,
  sorting as sortingEnum,
  printType as printTypeEnum,
  searchParams as searchParamsEnum,
} from '../../../enums';

import loadingReducer, {
  startLoading,
  finishLoading
} from './loading';

import createResultsReducer, {
  setNoResults,
  selectors as resultsSelectors
} from './results';


export { setNoResults, resultsSelectors };

export const runSearch = createAction('run search');

export const resultsLoaded = createAction('results loaded');

const selectSearch = (state) => state.newSearch || {};
const selectSearchResults = flow(selectSearch, searchState => searchState.results || {});

// export const selectResponseTime = flow(selectSearchResults, resultsState => resultsState.responseTime || 0);

// export const selectResultsCount = flow(selectSearchResults, resultsState => resultsState.resultsCount || 0);

// export const selectNoResultsStatus = (state) => state.newSearch.results.noResults.status;
// export const selectNoResultsTerm = (state) => state.newSearch.results.noResults.term;

export const setFilterPanelVisibility = createAction('set filter panel visibility');

const filterPanelVisibleReducer = createReducer({
  [setFilterPanelVisibility]: (state, value) => value,
}, false);

const filterPanelTouchedReducer = createReducer({
  [setFilterPanelVisibility]: () => true,
  [resultsLoaded]: () => false,
}, false);

const filterPanelReducer = combineReducers({
  visible: filterPanelVisibleReducer,
  touched: filterPanelTouchedReducer,
});

const setSearchParamByKey = createAction('set search param', (key, value) => ({key, value}));

export const createSearchParamSetter = (key) => (value) => setSearchParamByKey.call(null, key, value);
export const createSearchParamSelector = (key) => (store) => store.newSearch.searchParams[key];

export const setSearchFilter = createSearchParamSetter('filter');
export const selectSearchFilter = createSearchParamSelector('filter');

export const setSorting = createSearchParamSetter('sorting');
export const selectSorting = createSearchParamSelector('sorting');

export const setPrintType = createSearchParamSetter('printType');
export const selectPrintType = createSearchParamSelector('printType');

export const setTerm = createSearchParamSetter('term');
export const selectTerm = createSearchParamSelector('term');

const setSearchParams = createAction('set search params', (searchState) => {
  return mapValues(searchState, function(value, key) {
    switch (key) {
      case 'filter':
        return filterEnum.itemValues.includes(value) ? value : filterEnum.defaultValue;
      case 'sorting':
        return sortingEnum.itemValues.includes(value) ? value : sortingEnum.defaultValue;
      case 'printType':
        return printTypeEnum.itemValues.includes(value) ? value : printTypeEnum.defaultValue;
      default:
        return value;
    }
  });

  let { filter, sorting, printType } = searchState;
  if (!filterEnum.includes(filter)) {

  }
});
const selectSearchParams = (state) => state.newSearch.searchParams;

const searchParamsReducer = createReducer({
  [setSearchParamByKey]: (state, {key, value}) => ({...state, [key]: value}),
  [setSearchParams]: (state, newState) => newState,
}, {
  filter: filterEnum.defaultValue,
  sorting: sortingEnum.defaultValue,
  printType: printTypeEnum.defaultValue
});

export default combineReducers({
  searchParams: searchParamsReducer,
  results: createResultsReducer(resultsLoaded),
  loading: loadingReducer,
  filterPanel: filterPanelReducer,
});

export const isFilterPanelVisible = (state) => state.newSearch.filterPanel.touched ? state.newSearch.filterPanel.visible : isFilterPanelVisibleInnerSelector(state);

export const isFilterPanelVisibleInnerSelector = (state) => {
  const isPrintTypeSelected = selectPrintType(state) !== printTypeEnum.defaultValue;
  const isFilterSelected = selectSearchFilter(state) !== filterEnum.defaultValue;
  const isSortingSelected = selectSorting(state) !== sortingEnum.defaultValue;

  return isPrintTypeSelected || isFilterSelected || isSortingSelected;
}

export const goToSearchPage = createAction('go to search page');

//
// function* searchPageSaga() {
//   takeLatest([
//     () =>
//   ])
// }

const dropdownFilterChanged = (action) => action.type === setSearchParamByKey.getType() && action.payload.key !== 'term'

export function* newSearchSaga() {
  yield takeLatest(LOCATION_CHANGE, updateSearchStateFromRouter);
  yield takeLatest(LOCATION_CHANGE, performSearch);

  yield takeLatest([
    runSearch.getType(),
    dropdownFilterChanged,
  ], updateRouterFromSearchState);

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

function transformFromSearchParamsToRoute(searchParams, initObj = {}) {
  return reduce(searchParamsEnum.relation, (res, obj) => {
    const { routeKey, stateKey, toRoute } = obj;
    res[routeKey] = toRoute(searchParams[stateKey]);
    return res;
  }, initObj)
}

function transformFromRouteToSearchParams(routeParams, initObj = {}) {
  return reduce(searchParamsEnum.relation, (res, obj) => {
    const { routeKey, stateKey, toState } = obj;
    res[stateKey] = toState(routeParams[routeKey]);
    return res;
  }, initObj)
}

export function* updateSearchStateFromRouter({payload}) {
  if (!(yield call(isSearchPage))) {
    return;
  }

  const search = yield select(state => get(state, 'router.location.search', ''));
  const searchObj = qs.parse(search);
  yield put(setSearchParams({
    filter: searchObj.fltr,
    printType: searchObj.prnt,
    sorting: searchObj.srt,
    term: searchObj.trm,
  }));
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
    filter: selectSearchFilter(state),
    orderBy: selectSorting(state),
    printType: selectPrintType(state),
    term: selectTerm(state),
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

  const searchParams = transformFromSearchParamsToRoute({
    filter,
    sorting: orderBy,
    printType,
    term,
  }, qs.parse(search));

  return qs.stringify(searchParams);
}

// let lastParamsStr;
export function* performSearch() {
  if (!(yield call(isSearchPage))) {
    return;
  }

  const term = yield select(selectTerm);
  // const sorting = yield select(sortingStuff.select);
  // const printType = yield select(printTypeStuff.select);
  // const filter = true; //yield select(filterStuff.select);

  // const params = yield call(computeGoogleSearchParams);
  // // TODO: подумать о другом способе
  // const paramsStr = JSON.stringify(params);
  // if (paramsStr === lastParamsStr) {
  //   return;
  // }

  yield put(startLoading());
  try {
    const searchParams = yield select(selectSearchParams);
    const { data: { items, totalItems, responseTime } } = yield call(loadBooks, searchParams);

    yield put(resultsLoaded({
      responseTime,
      items,
      totalItems,
      term: searchParams.term,
    }));
  } catch (e) {
    console.log(e);
    yield put(setNoResults(term));
    return;
  } finally {
    yield put(finishLoading());
    // lastParamsStr = paramsStr;
  }
}

export const getSearchLinkByAuthor = (author) => `/search?trm=inauthor:"${encodeURIComponent(author)}"`;
