import { createSelector } from 'reselect';
import { flow } from 'lodash';
import qs from 'query-string';

export const selectRouter = state => state.router;

export const selectLocation = flow(
  selectRouter,
  routerState => routerState.location,
);

export const selectSearchString = flow(
  selectLocation,
  locationState => locationState.search,
);

export const selectSearch = createSelector(
  selectSearchString,
  searchStr => qs.parse(searchStr),
);
