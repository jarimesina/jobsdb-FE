import {
  watchFetchProfile,
  watchHandleLogin,
  watchRemoveSavedJob,
  watchUpdateNormalUser
} from './duck/saga';
import { all } from 'redux-saga/effects';
import AuthReducer from './duck/reducer';

function* AuthSaga() {
  yield all([
    watchHandleLogin(),
    watchFetchProfile(),
    watchUpdateNormalUser(),
    watchRemoveSavedJob(),
  ]);
}

export {
  AuthSaga,
  AuthReducer
}