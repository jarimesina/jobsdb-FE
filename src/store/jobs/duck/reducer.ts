import { JobDetails } from "./../../../components/CreateJob";
import { ActionType } from "typesafe-actions";
import * as JobActions from './actions';

export interface State {
  jobs: JobDetails[];
  total: number;
}

const initialState: State = {
  jobs: [],
  total: 0
}

type JobActions = ActionType<typeof JobActions>

export default function reducer(state: State = initialState, action: JobActions): State{
  switch (action.type) {
    case JobActions.FETCH_JOBS:
      return {
        ...state,
        jobs: [],
        total: 0,
      };
    case JobActions.FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload.jobs,
        total: action.payload.total
      };
    // TODO: add reducers for api failures
    case JobActions.FILTER_JOBS_BY_DATE:
      return {
        ...state,
        jobs: state.jobs.filter(job => (job.dateCreated >= action.payload.datePosted))
      }
    case JobActions.FILTER_JOBS_BY_LANGUAGE:
      return {
        ...state,
        jobs: state.jobs.filter(job => job.languages.includes(action.payload.language))
      }
    default: 
      return state;
  }
}

