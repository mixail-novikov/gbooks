import _ from 'lodash';

import { searchParamsInitialState } from './reducer';

const selectSearch = state => state.newSearch;

const createSearchParamSelector = key => store => store.newSearch.searchParams[key];
export const selectSearchFilter = createSearchParamSelector('filter');
export const selectSorting = createSearchParamSelector('sorting');
export const selectPrintType = createSearchParamSelector('printType');
export const selectTerm = createSearchParamSelector('term');

export const selectLoadingStatus = _.flow(
  selectSearch,
  searchState => searchState.loading,
);

export const selectSearchResults = _.flow(
  selectSearch,
  searchState => searchState.results,
);

export const selectSearchParams = state => state.newSearch.searchParams;

export const isSearchParamsEqualDefaults = (
  searchParams,
  defaults = searchParamsInitialState,
) => _.every(defaults, (value, key) => searchParams[key] === value);

export const getSearchLinkByAuthor = author => `/search?trm=inauthor:"${encodeURIComponent(author)}"`;
