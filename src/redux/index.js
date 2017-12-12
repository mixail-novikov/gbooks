import createStore from './store';
import runSaga from './sagas';
import { history } from './router';

export default function configureStore(initialState) {
  return {
    store: createStore(initialState),
    runSaga,
    history,
  };
}
