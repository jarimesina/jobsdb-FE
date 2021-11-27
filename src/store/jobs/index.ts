import {
  watchFetchJobs
} from './duck/saga';
import { all } from 'redux-saga/effects';
import JobsReducer from './duck/reducer';

function* JobSaga() {
  yield all([
    watchFetchJobs()
  ]);
}

export {
  JobSaga,
  JobsReducer
}