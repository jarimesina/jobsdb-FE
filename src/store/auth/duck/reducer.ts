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
        ...action.payload
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
    case AuthActions.LOGOUT: 
      return initialState;
    default:
      return state;
  }
} 