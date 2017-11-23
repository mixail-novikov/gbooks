import createStore from './store';
import runSaga from './saga';

export default function configureStore(initialState) {
  return {
    store: createStore(initialState),
    runSaga,
  };
}
