import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { sagaMiddleware } from './saga';
import { routerMiddleware } from './router';

import rootReducer from './reducer';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware,
      )
    )
  );
}
