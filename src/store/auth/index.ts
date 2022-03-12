import {
  watchFetchProfile,
  watchHandleLogin,
  watchRemoveSavedJob,
  watchSaveJob,
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
    watchSaveJob(),
  ]);
}

export {
  AuthSaga,
  AuthReducer
}