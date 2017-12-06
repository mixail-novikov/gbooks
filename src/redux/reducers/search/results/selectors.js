import { flow } from 'lodash';
import * as selectors from '../selectors';

export const selectResultsCount = flow(
  selectors.selectSearchResults,
  resultsState => resultsState.count,
)

export const selectResponseTime = flow(
  selectors.selectSearchResults,
  resultsState => resultsState.responseTime,
)

export const selectNoResults = flow(
  selectors.selectSearchResults,
  resultsState => resultsState.noResults,
)

export const selectNoResultsStatus = flow(
  selectNoResults,
  noResultsState => noResultsState.status,
);

export const selectNoResultsTerm = flow(
  selectNoResults,
  noResultsState => noResultsState.term,
)
