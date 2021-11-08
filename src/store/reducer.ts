import { combineReducers } from 'redux';
import JobReducer from '../store/jobs/duck/reducer';

export default combineReducers({
  jobs: JobReducer,
});