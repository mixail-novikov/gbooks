import { takeLatest, select, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { matchPath } from 'react-router';
import _ from 'lodash';
import qs from 'query-string';

import { searchParams as searchParamsEnum } from '../../../enums';
import { loadBooks } from '../../../api';
import {
  runSearch,
  setSearchParams,
  dropdownFilterChanged,
  selectSearchParams,
  startLoading,
  finishLoading,
} from '../../reducers/search';
import { selectSearch } from '../../reducers/router/selectors';
import { resultsLoaded, setNoResults } from '../../reducers/results/actions';

function transformFromSearchParamsToRoute(searchParams, initObj = {}) {
  return _.reduce(searchParamsEnum.relation, (res, obj) => {
    const { routeKey, stateKey, toRoute } = obj;
    res[routeKey] = toRoute(searchParams[stateKey]);
    return res;
  }, initObj);
}

function* updateRouterFromSearchState() {
  const searchParams = yield select(selectSearchParams);
  const currentRouterSearch = yield select(selectSearch);

  const search = transformFromSearchParamsToRoute(searchParams, currentRouterSearch);

  yield put(push({
    search: qs.stringify(search),
  }));
}

function transformFromRouteToSearchParams(routeParams, initObj = {}) {
  return _.reduce(searchParamsEnum.relation, (res, obj) => {
    const { routeKey, stateKey, toState } = obj;
    res[stateKey] = toState(routeParams[routeKey]);
    return res;
  }, initObj);
}

function* updateSearchStateFromRouter() {
  const searchObj = yield select(selectSearch);
  const searchParamsFromRoute = transformFromRouteToSearchParams(searchObj);
  yield put(setSearchParams(searchParamsFromRoute));
}

function listenForSearchPageLocationChange({ type, payload }) {
  if (type !== LOCATION_CHANGE) {
    return false;
  }

  const { pathname } = payload;
  const match = matchPath(pathname, { path: '/search' });

  return match && match.isExact;
}

export function* performSearch() {
  yield put(startLoading());
  const searchParams = yield select(selectSearchParams);
  try {
    const { data: { items, totalItems, responseTime } } = yield call(loadBooks, searchParams);

    yield put(resultsLoaded({
      responseTime,
      items,
      totalItems,
      currentSearch: searchParams,
    }));
  } catch (e) {
    yield put(setNoResults(searchParams));
    return;
  } finally {
    yield put(finishLoading());
  }
}

function* onSearchPageLocationChange() {
  yield call(updateSearchStateFromRouter);
  yield call(performSearch);
}

const listenForRunSearch = [
  runSearch.getType(),
  dropdownFilterChanged,
];

function* onRunSearch() {
  yield call(updateRouterFromSearchState);
}

export default function* searchSaga() {
  yield takeLatest(listenForSearchPageLocationChange, onSearchPageLocationChange);
  yield takeLatest(listenForRunSearch, onRunSearch);
}
