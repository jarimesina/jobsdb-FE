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