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
    default: 
      return state;
  }
}

