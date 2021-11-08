import {
  watchFetchJobs
} from './duck/saga';
import { all } from 'redux-saga/effects';

function* JobSaga() {
  yield all([
    watchFetchJobs()
  ]);
}

export {
  JobSaga
}