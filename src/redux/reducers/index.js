import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import searchReducer from './search';
import booksReducer from './books';
import speechReducer from './speech';
import searchQueryReducer from './searchQuery';
import newSearchReducer from './newSearch';

export default combineReducers({
  search: searchReducer,
  searchQuery: searchQueryReducer,
  books: booksReducer,
  speechPopup: speechReducer,
  router: routerReducer,
  newSearch: newSearchReducer,
})
