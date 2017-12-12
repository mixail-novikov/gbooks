import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import booksReducer from './books';
import speechReducer from './speech';
import newSearchReducer from './search';
import resultsReducer from './results';
import filterPanelReducer from './filterPanel';

export default combineReducers({
  books: booksReducer,
  speechPopup: speechReducer,
  router: routerReducer,
  newSearch: newSearchReducer,
  results: resultsReducer,
  filterPanel: filterPanelReducer,
});
