import { createAction } from 'redux-act';
import _ from 'lodash';

import {
  filter as filterEnum,
  sorting as sortingEnum,
  printType as printTypeEnum,
} from '../../../enums';

export const runSearch = createAction('run search');

export const startLoading = createAction('start loading');

export const finishLoading = createAction('finish loading');

export const setSearchParamByKey = createAction('set search param', (key, value) => ({ key, value }));

const createSearchParamSetter = key => value => setSearchParamByKey.call(null, key, value);

export const setSearchFilter = createSearchParamSetter('filter');

export const setSorting = createSearchParamSetter('sorting');

export const setPrintType = createSearchParamSetter('printType');

export const setTerm = createSearchParamSetter('term');

export const setSearchParams = createAction('set search params', searchState => _.mapValues(
  searchState,
  (value, key) => {
    // TODO move it to sanitize search params
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
