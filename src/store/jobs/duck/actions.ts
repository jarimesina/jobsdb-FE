import { action } from 'typesafe-actions';
import { JobDetails } from '../../../components/CreateJob';

export const FETCH_JOBS = 'job/FETCH_JOBS';
export const FETCH_JOBS_SUCCESS = 'job/FETCH_JOBS_SUCCESS';

export const fetchJobs = () => action(FETCH_JOBS);
export const fetchJobsSuccess = (jobs: { data: JobDetails[]}) => action(FETCH_JOBS_SUCCESS, { jobs: jobs.data });