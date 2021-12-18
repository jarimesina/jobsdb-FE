import { action } from 'typesafe-actions';

export const LOGIN = "AUTH/LOGIN";
export const LOGIN_SUCCESS = "AUTH/LOGIN_SUCCESS";

export const LOGOUT = "AUTH/LOGOUT";
export const FETCH_PROFILE = "FETCH_PROFILE";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";

export const login = (email: string, password: string) => action(LOGIN, {email, password});
export const loginSuccess = (data: {
  token: string,
  userId: string,
}) => action(LOGIN_SUCCESS, {...data});

export const logout = () => action(LOGOUT);
export const fetchProfile = () => action(FETCH_PROFILE);
export const fetchProfileSuccess = (data: any) => action(FETCH_PROFILE_SUCCESS, { data });

