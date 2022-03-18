import { action } from 'typesafe-actions';

export const LOGIN = "AUTH/LOGIN";
export const LOGIN_SUCCESS = "AUTH/LOGIN_SUCCESS";

export const LOGOUT = "AUTH/LOGOUT";
export const FETCH_PROFILE = "FETCH_PROFILE";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";

export const UPDATE_NORMAL_USER = "UPDATE_NORMAL_USER";
export const UPDATE_NORMAL_USER_SUCCESS = "UPDATE_NORMAL_USER_SUCCESS";
export const REMOVE_SAVED_JOB = 'AUTH/REMOVE_SAVED_JOB';
export const REMOVE_SAVED_JOB_SUCCESS = 'AUTH/REMOVE_SAVED_JOB_SUCCESS';
export const SAVE_JOB = 'SAVE_JOB';
export const SAVE_JOB_SUCCESS = 'SAVE_JOB_SUCCESS';
export const UPDATE_ADMIN = 'UPDATE_ADMIN';
export const UPDATE_ADMIN_SUCCESS = 'UPDATE_ADMIN_SUCCESS';

export const login = (email: string, password: string) => action(LOGIN, {email, password});
export const loginSuccess = (
  token: string,
  userId: string) => action(LOGIN_SUCCESS, {token, userId});

export const logout = () => action(LOGOUT);
export const fetchProfile = () => action(FETCH_PROFILE);
export const fetchProfileSuccess = (data: any) => action(FETCH_PROFILE_SUCCESS, { data });

export const updateNormalUser = (id: string, firstName: string, lastName:string, image: string) => action(UPDATE_NORMAL_USER, {id, firstName, lastName, image});
export const updateNormalUserSuccess = (data:any) => action(UPDATE_NORMAL_USER_SUCCESS, { data });

export const saveJob = (jobId: string, userId: string) => action(SAVE_JOB, {jobId, userId});
export const saveJobSuccess = (data:any) => action(SAVE_JOB_SUCCESS, {data});

export const removeSavedJob = (jobId: string, userId: string) => action(REMOVE_SAVED_JOB, {jobId, userId});
export const removeSavedJobSuccess = (data:any) => action(REMOVE_SAVED_JOB_SUCCESS, {data});

export const updateAdmin = (id:string, companyName:string, about:string, benefits:string, image:string, industry:string, numberOfEmployees:string) => action(UPDATE_ADMIN, {id, companyName, about, benefits, image, industry, numberOfEmployees});
export const updateAdminSuccess = (data:any) => action(UPDATE_ADMIN_SUCCESS, { data });
