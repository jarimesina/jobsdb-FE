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
    case JobActions.APPLY_JOB:
      return {
        ...state,
      }
    case JobActions.APPLY_JOB_SUCCESS:
      // insert job in current jobs 
      return {
        ...state,
        jobs: state.jobs.map((obj: any) => {
          if(action.payload.data.data._id === obj._id){
            return action.payload.data.data;
          }
          return obj;
        })
      }
    default: 
      return state;
  }
}

