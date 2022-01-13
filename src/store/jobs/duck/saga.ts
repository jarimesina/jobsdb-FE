import * as JobActions from "./actions";
import { call, put, takeLatest } from 'redux-saga/effects'
import * as JobService from '../../../api/JobService';
import { AxiosResponse } from "axios";
import { ActionType } from "typesafe-actions";

export function* handleFetchJobs(action: ActionType<typeof JobService.fetchJobs>) {
  try {
    const { payload: { skip, limit}} = action;
    const response: AxiosResponse = yield call(JobService.fetchJobs, skip, limit);
    yield put(JobActions.fetchJobsSuccess({jobs: response.data.data.jobs, total: response.data.data.total}));
  } catch (e) {
    //  yield put({type: "JOB_FETCH_FAILED", message: e.message});
  }
}

// this function watches the fetchJobs generator function
export function* watchFetchJobs() {
  yield takeLatest(JobActions.FETCH_JOBS, handleFetchJobs);
}