import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import searchReducer from './search';
import booksReducer from './books';
import speechReducer from './speech';
import newSearchReducer from './newSearch';

export default combineReducers({
  search: searchReducer,
  books: booksReducer,
  speechPopup: speechReducer,
  router: routerReducer,
  newSearch: newSearchReducer,
})
