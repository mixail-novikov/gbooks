import { performSearch, isSearchPage, newSearchSaga, updateSearchStateFromRouter } from './';
import { call, select, takeLatest } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { LOCATION_CHANGE } from 'react-router-redux';

import * as termStuff from './term';

describe('performSearch', () => {
  const gen = cloneableGenerator(performSearch)();

  describe('check search page', () => {
    let searchGen;
    beforeEach(() => searchGen = gen.clone());

    it('must run only on search page', () => {
      expect(searchGen.next().value).toEqual(call(isSearchPage));
      expect(searchGen.next(false).done).toEqual(true);
    });

    it('must continue search', () => {
      expect(searchGen.next().value).toEqual(call(isSearchPage));
      expect(searchGen.next(true).done).toEqual(false);
    });
  });
});

describe('newSearchSaga', () => {
  const gen = newSearchSaga();

  it('must run updateSearchStateFromRouter on LOCATION_CHANGE', () => {
    expect(gen.next().value).toEqual(takeLatest(LOCATION_CHANGE, updateSearchStateFromRouter));
  });
});
