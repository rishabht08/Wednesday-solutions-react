import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs } from '../../services/songsApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_ITUNES_MUSIC } = homeContainerTypes;
const { successGetItunesMusic, failureGetItunesMusic } = homeContainerCreators;
export function* getItunesMusic(action) {
 
  const response = yield call(getSongs, action.name);  
  const { ok, data } = response;
  if (ok) {
    yield put(successGetItunesMusic(data));
  } else {
    yield put(failureGetItunesMusic(data));
  }
}
// Individual exports for testing
export function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_MUSIC, getItunesMusic);
}
