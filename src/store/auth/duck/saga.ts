import { setToken } from "./../../../api/axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import * as AuthActions from '../../auth/duck/actions';
import * as AuthService from '../../../api/AuthService';
import { AxiosResponse } from "axios";
import { Cookies } from "react-cookie";

export function* handleLogin(action: ActionType<typeof AuthService.login>) {
  try {
    const { payload: { email, password}} = action;
    const response: AxiosResponse = yield call(AuthService.login, email, password);
    const { data } = response;
    yield put(AuthActions.loginSuccess(data));
    const cookies = new Cookies();
    cookies.set('AUTH_KEY',data.token, { path: '/'});
    setToken(data.token);
  } catch (error) {
    const cookies = new Cookies();
    cookies.remove('AUTH_KEY', { path: '/'});
  }
}

export function* watchHandleLogin() {
  yield takeLatest(AuthActions.LOGIN, handleLogin);
}