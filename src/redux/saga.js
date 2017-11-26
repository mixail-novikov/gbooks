import createSagaMiddleware from 'redux-saga';
import { searchSaga } from './reducers/search';
import { newSearchSaga } from './reducers/newSearch';

export const sagaMiddleware = createSagaMiddleware();

export default function runSaga() {
  sagaMiddleware.run(searchSaga);
  sagaMiddleware.run(newSearchSaga);
}
