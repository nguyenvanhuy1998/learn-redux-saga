import { all } from 'redux-saga/effects';
import counterSaga from '../features/counter/counterSaga';
import authSaga from 'features/auth/authSaga';

export default function* rootSaga() {
  console.log('Root Saga');
  yield all([counterSaga(), authSaga()]);
}
