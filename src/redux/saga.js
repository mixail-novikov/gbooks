import createSagaMiddleware from 'redux-saga';
import { newSearchSaga } from './reducers/newSearch';

export const sagaMiddleware = createSagaMiddleware();

export default function runSaga() {
  sagaMiddleware.run(newSearchSaga);
}
