import { flow } from 'lodash';

const selectResults = state => state.results;

export const selectResultsCount = flow(
  selectResults,
  resultsState => resultsState.count,
);

export const selectResponseTime = flow(
  selectResults,
  resultsState => resultsState.responseTime,
);

export const selectNoResults = flow(
  selectResults,
  resultsState => resultsState.noResults,
);

export const selectNoResultsStatus = flow(
  selectNoResults,
  noResultsState => noResultsState.status,
);

export const selectNoResultsTerm = flow(
  selectNoResults,
  noResultsState => noResultsState.term,
);
