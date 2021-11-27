import { ActionType } from "typesafe-actions";
import * as AuthActions from './actions';

export interface State {
  token: string | null;
  userId: string | null;
}

const initialState: State = {
  token: null,
  userId: null,
}

type AuthActions = ActionType<typeof AuthActions>;

export default function reducer(state: State = initialState, action: AuthActions): State {
  switch(action.type){
    case AuthActions.LOGIN:
      return {
        ...state,
        token: null,
        userId: null
      }
    case AuthActions.LOGIN_SUCCESS: 
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
} 