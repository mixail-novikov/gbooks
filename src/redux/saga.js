import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export default function runSaga() {
  sagaMiddleware.run(function*() {
    yield console.log('okk');
  });
}
