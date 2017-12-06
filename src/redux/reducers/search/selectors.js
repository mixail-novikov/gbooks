import { flow } from 'lodash';
import * as selectors from '../selectors';

export const selectLoadingStatus = flow(
  selectors.selectSearch,
  searchState => searchState.loading
);

export const selectSearchResults = flow(
  selectors.selectSearch,
  searchState => searchState.results
);
