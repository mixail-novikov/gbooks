import { createAction, createReducer, batch } from 'redux-act';
import { combineReducers } from 'redux';
import * as qs from 'query-string';
import { get, flow, mapValues, reduce } from 'lodash';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import { push, LOCATION_CHANGE } from 'react-router-redux';
import { matchPath } from 'react-router';

import { loadBooks } from '../../../api';

import { resultsLoaded } from '../results/actions';

import * as selectors from './selectors';

import {
  filter as filterEnum,
  sorting as sortingEnum,
  printType as printTypeEnum,
  searchParams as searchParamsEnum,
} from '../../../enums';

import loadingReducer, {
  startLoading,
  finishLoading,
} from './loading';

export { startLoading, finishLoading };

export const runSearch = createAction('run search');

const selectSearch = state => state.newSearch || {};
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

const setSearchParamByKey = createAction('set search param', (key, value) => ({ key, value }));

export const createSearchParamSetter = key => value => setSearchParamByKey.call(null, key, value);
export const createSearchParamSelector = key => store => store.newSearch.searchParams[key];

export const setSearchFilter = createSearchParamSetter('filter');
export const selectSearchFilter = createSearchParamSelector('filter');

export const setSorting = createSearchParamSetter('sorting');
export const selectSorting = createSearchParamSelector('sorting');

export const setPrintType = createSearchParamSetter('printType');
export const selectPrintType = createSearchParamSelector('printType');

export const setTerm = createSearchParamSetter('term');
export const selectTerm = createSearchParamSelector('term');

export const setSearchParams = createAction('set search params', (searchState) => {
  return mapValues(searchState, (value, key) => {
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
});
export const selectSearchParams = state => state.newSearch.searchParams;

const searchParamsReducer = createReducer({
  [setSearchParamByKey]: (state, { key, value }) => ({ ...state, [key]: value }),
  [setSearchParams]: (state, newState) => newState,
}, {
  filter: filterEnum.defaultValue,
  sorting: sortingEnum.defaultValue,
  printType: printTypeEnum.defaultValue,
});

export default combineReducers({
  searchParams: searchParamsReducer,
  // results: createResultsReducer(resultsLoaded),
  loading: loadingReducer,
  filterPanel: filterPanelReducer,
});

export const isFilterPanelVisible = state => (state.newSearch.filterPanel.touched ? state.newSearch.filterPanel.visible : isFilterPanelVisibleInnerSelector(state));

export const isFilterPanelVisibleInnerSelector = (state) => {
  const isPrintTypeSelected = selectPrintType(state) !== printTypeEnum.defaultValue;
  const isFilterSelected = selectSearchFilter(state) !== filterEnum.defaultValue;
  const isSortingSelected = selectSorting(state) !== sortingEnum.defaultValue;

  return isPrintTypeSelected || isFilterSelected || isSortingSelected;
};

export const goToSearchPage = createAction('go to search page');

//
// function* searchPageSaga() {
//   takeLatest([
//     () =>
//   ])
// }

export const dropdownFilterChanged = action => action.type === setSearchParamByKey.getType() && action.payload.key !== 'term';

export const getSearchLinkByAuthor = author => `/search?trm=inauthor:"${encodeURIComponent(author)}"`;
