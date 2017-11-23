import createStore from './store';
import runSaga from './saga';
import { history } from './router';

export default function configureStore(initialState) {
  return {
    store: createStore(initialState),
    runSaga,
    history,
  };
}
