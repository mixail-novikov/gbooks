import { LOCATION_CHANGE } from 'react-router-redux';
import { createReducer, createAction } from 'redux-act';
import { take, select} from 'redux-saga/effects';

export const testAction = createAction('test action');

export default createReducer({
  [testAction]: (state, payload) => payload,
  [LOCATION_CHANGE]: (state, {search}) => {
    const params = new URLSearchParams(search);
    return params.get('q');
  }
}, '');

export function* testSaga() {
  while (true) {
    yield take(testAction.getType());
    const s = yield select(state => state.searchQuery);
    console.log(s);
  }
}
