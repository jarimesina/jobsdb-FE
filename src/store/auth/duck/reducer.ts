import { ActionType } from "typesafe-actions";
import * as AuthActions from './actions';

export interface State {
  token: string | null;
  userId: string | null;
  profile: any;
}

const initialState: State = {
  token: null,
  userId: null,
  profile: null,
}

type AuthActions = ActionType<typeof AuthActions>;

export default function reducer(state: State = initialState, action: AuthActions): State {
  switch(action.type){
    case AuthActions.LOGIN:
      return {
        ...state,
        token: null,
        userId: null
      };
    case AuthActions.LOGIN_SUCCESS: 
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId
      };
    case AuthActions.FETCH_PROFILE: 
      return {
        ...state,
        profile: null
      };
    case AuthActions.FETCH_PROFILE_SUCCESS: 
      return {
        ...state,
        profile: action.payload.data
      };
    case AuthActions.UPDATE_NORMAL_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          info: {}
        },
      };
    case AuthActions.UPDATE_NORMAL_USER_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          info: {
            ...state.profile.info,
            ...action.payload.data,
          }
        }
      };
    case AuthActions.SAVE_JOB:
    case AuthActions.REMOVE_SAVED_JOB:
      return {
        ...state,
        profile: {
          ...state.profile,
          info: {
            ...state.profile.info,
            saved_jobs: []
          }
        },
      };
    case AuthActions.SAVE_JOB_SUCCESS:
    case AuthActions.REMOVE_SAVED_JOB_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          info: {
            ...state.profile.info,
            saved_jobs: action.payload.data
          }
        },
      };
    case AuthActions.LOGOUT: 
      return initialState;
    default:
      return state;
  }
} 