import { action } from 'typesafe-actions';

export const LOGIN = "AUTH/LOGIN";
export const LOGIN_SUCCESS = "AUTH/LOGIN_SUCCESS";

export const login = (email: string, password: string) => action(LOGIN, {email, password});
export const loginSuccess = (data: {
  token: string,
  userId: string,
}) => action(LOGIN_SUCCESS, {...data});


