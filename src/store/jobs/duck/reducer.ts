import { JobDetails } from "./../../../components/CreateJob";
import { ActionType } from "typesafe-actions";
import * as JobActions from './actions';

export interface State {
  jobs: JobDetails[];
}

const initialState: State = {
  jobs: [],
}

type JobActions = ActionType<typeof JobActions>

export default function reducer(state: State = initialState, action: JobActions): State{
  switch (action.type) {
    case JobActions.FETCH_JOBS:
      return {
        ...state,
        jobs: []
      };
    case JobActions.FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload.jobs
      };
    // TODO: remove the FILTER_JOBS_BY_DATE and FILTER_JOBS_BY_LANGUAGE action creators since it is no longer necessary
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

