import {
  watchApplyJobs,
  watchFetchJobs
} from './duck/saga';
import { all } from 'redux-saga/effects';
import JobsReducer from './duck/reducer';

function* JobSaga() {
  yield all([
    watchFetchJobs(),
    watchApplyJobs(),
  ]);
}

export {
  JobSaga,
  JobsReducer
}