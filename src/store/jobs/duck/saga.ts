import * as JobActions from "./actions";
import { call, put, takeLatest } from 'redux-saga/effects'
import * as JobService from '../../../api/JobService';
import { AxiosResponse } from "axios";

export function* handleFetchJobs() {
  try {
    const response: AxiosResponse = yield call(JobService.fetchJobs);
    console.log(response.data);
    yield put(JobActions.fetchJobsSuccess(response.data));
  } catch (e) {
    //  yield put({type: "JOB_FETCH_FAILED", message: e.message});
  }
}

// this function watches the fetchJobs generator function
export function* watchFetchJobs() {
  yield takeLatest(JobActions.FETCH_JOBS, handleFetchJobs);
}