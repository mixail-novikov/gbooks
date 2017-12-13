import { createAction, createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import _ from 'lodash';

import {
  filter as filterEnum,
  sorting as sortingEnum,
  printType as printTypeEnum,
} from '../../../enums';

import loadingReducer, {
  startLoading,
  finishLoading,
} from './loading';

export { startLoading, finishLoading };

export const runSearch = createAction('run search');

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

export const setSearchParams = createAction('set search params', searchState => _.mapValues(
  searchState,
  (value, key) => {
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
  },
));

export const selectSearchParams = state => state.newSearch.searchParams;

const searchParamsInitialState = {
  filter: filterEnum.defaultValue,
  sorting: sortingEnum.defaultValue,
  printType: printTypeEnum.defaultValue,
};

const searchParamsReducer = createReducer({
  [setSearchParamByKey]: (state, { key, value }) => ({ ...state, [key]: value }),
  [setSearchParams]: (state, newState) => newState,
}, searchParamsInitialState);

export const isSearchParamsEqualDefaults = (
  searchParams,
  defaults = searchParamsInitialState,
) => _.every(defaults, (value, key) => searchParams[key] === value);

export default combineReducers({
  searchParams: searchParamsReducer,
  loading: loadingReducer,
});

export const dropdownFilterChanged = action => action.type === setSearchParamByKey.getType() && action.payload.key !== 'term';

export const getSearchLinkByAuthor = author => `/search?trm=inauthor:"${encodeURIComponent(author)}"`;
