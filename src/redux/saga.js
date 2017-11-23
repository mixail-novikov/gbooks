import createSagaMiddleware from 'redux-saga';
import { searchSaga } from './reducers/search';


export const sagaMiddleware = createSagaMiddleware();

export default function runSaga() {
  sagaMiddleware.run(searchSaga);
}
