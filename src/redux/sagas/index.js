import createSagaMiddleware from 'redux-saga';
import searchSaga from './search';

export const sagaMiddleware = createSagaMiddleware();

export default function runSaga() {
  sagaMiddleware.run(searchSaga);
}
