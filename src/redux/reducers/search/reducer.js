import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import {
  filter as filterEnum,
  sorting as sortingEnum,
  printType as printTypeEnum,
} from '../../../enums';

import { startLoading, finishLoading, setSearchParamByKey, setSearchParams } from './actions';

const loadingReducer = createReducer({
  [startLoading]: () => true,
  [finishLoading]: () => false,
}, false);

export const searchParamsInitialState = {
  filter: filterEnum.defaultValue,
  sorting: sortingEnum.defaultValue,
  printType: printTypeEnum.defaultValue,
};

const searchParamsReducer = createReducer({
  [setSearchParamByKey]: (state, { key, value }) => ({ ...state, [key]: value }),
  [setSearchParams]: (state, newState) => newState,
}, searchParamsInitialState);

export default combineReducers({
  searchParams: searchParamsReducer,
  loading: loadingReducer,
});
