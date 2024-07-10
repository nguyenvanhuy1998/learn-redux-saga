import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { studentActions } from './studentSlice';
import studentApi from 'api/studentApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, Student } from 'models';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}
function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}
export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.toString(), fetchStudentList);
  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}
