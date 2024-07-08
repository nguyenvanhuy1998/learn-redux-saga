import { all } from 'redux-saga/effects';
import counterSaga from '../features/counter/counterSaga';
import authSaga from 'features/auth/authSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import studentSaga from 'features/student/studentSaga';

export default function* rootSaga() {
  console.log('Root Saga');
  yield all([counterSaga(), authSaga(), dashboardSaga(), studentSaga()]);
}
