import { combineReducers } from 'redux';
import {JobsReducer} from './jobs';
import {AuthReducer} from './auth';

export default combineReducers({
  jobs: JobsReducer,
  auth: AuthReducer
});