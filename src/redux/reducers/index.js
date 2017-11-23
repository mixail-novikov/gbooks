import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import searchReducer from './search';
import booksReducer from './books';

export default combineReducers({
  search: searchReducer,
  books: booksReducer,
  router: routerReducer,
})
