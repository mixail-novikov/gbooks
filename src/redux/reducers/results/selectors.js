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

export const selectNoResultsStatus = flow(
  selectResults,
  resultsState => resultsState.noResults,
);

const selectCurrentParams = flow(
  selectResults,
  resultsState => resultsState.currentParams,
);

export const selectCurrentTerm = flow(
  selectCurrentParams,
  currentParamsState => currentParamsState.term,
);
