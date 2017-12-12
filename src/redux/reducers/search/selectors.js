import { flow } from 'lodash';

const selectSearch = state => state.newSearch;

export const selectLoadingStatus = flow(
  selectSearch,
  searchState => searchState.loading,
);

export const selectSearchResults = flow(
  selectSearch,
  searchState => searchState.results,
);
