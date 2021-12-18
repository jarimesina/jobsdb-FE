import {
  watchFetchProfile,
  watchHandleLogin
} from './duck/saga';
import { all } from 'redux-saga/effects';
import AuthReducer from './duck/reducer';

function* AuthSaga() {
  yield all([
    watchHandleLogin(),
    watchFetchProfile()
  ]);
}

export {
  AuthSaga,
  AuthReducer
}