import { setToken } from "./../../../api/axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import * as AuthActions from '../../auth/duck/actions';
import * as AuthService from '../../../api/AuthService';
import { AxiosResponse } from "axios";
import { Cookies } from "react-cookie";

export function* handleLogin(action: ActionType<typeof AuthService.login>) {
  try {
    const date = new Date();
    const minutes = 30;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    const { payload: { email, password}} = action;
    const response: AxiosResponse = yield call(AuthService.login, email, password);
    const { data } = response;
    yield put(AuthActions.loginSuccess(data));
    const cookies = new Cookies();
    cookies.set('AUTH_KEY',data.token, { path: '/', expires: date });
    setToken(data.token);
    localStorage.setItem("AUTH_KEY", data.token);
  } catch (error) {
    const cookies = new Cookies();
    cookies.remove('AUTH_KEY', { path: '/'});
  }
}

export function* watchHandleLogin() {
  yield takeLatest(AuthActions.LOGIN, handleLogin);
}

export function* handleFetchProfile() {
  try {
    const response: AxiosResponse = yield call(AuthService.fetchProfile);
    const { data } = response;
    yield put(AuthActions.fetchProfileSuccess(data.data));
  } catch (error) {
    const cookies = new Cookies();
    cookies.remove('AUTH_KEY', { path: '/'});
  }
}

export function* watchFetchProfile() {
  yield takeLatest(AuthActions.FETCH_PROFILE, handleFetchProfile);
}

// TODO: in saved jobs page. in order to display an item we need to access owner object cuz company name is not showing anymore so we need to display the company name by accessing owner object
export function* handleUpdateNormalUser(action: ActionType<typeof AuthService.updateNormalUser>) {
  try {
    const { payload: {id, firstName, lastName, image} } = action;
    const response: AxiosResponse = yield call(AuthService.updateNormalUser, id, firstName, lastName, image);
    const { data } = response;
    yield put(AuthActions.updateNormalUserSuccess(data.data.saved_jobs));
  } catch (error) {
    const cookies = new Cookies();
    cookies.remove('AUTH_KEY', { path: '/'});
  }
}

export function* watchUpdateNormalUser() {
  yield takeLatest(AuthActions.UPDATE_NORMAL_USER, handleUpdateNormalUser );
}

export function* handleRemoveSavedJob(action: ActionType<typeof AuthService.removeSavedJob>) {
  try {
    const { payload: {userId, jobId} } = action;
    const response: AxiosResponse = yield call(AuthService.removeSavedJob, userId, jobId);
    const { data: { data } } = response;
    yield put(AuthActions.removeSavedJobSuccess(data));
  } catch (error) {
    const cookies = new Cookies();
    cookies.remove('AUTH_KEY', { path: '/'});
  }
}

export function* watchRemoveSavedJob() {
  yield takeLatest(AuthActions.REMOVE_SAVED_JOB, handleRemoveSavedJob );
}