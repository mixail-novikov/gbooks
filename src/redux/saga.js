import { sagaMiddleware } from './store';

export default function runSaga() {
  sagaMiddleware.run(function*() {
    yield console.log('okk');
  });
}
