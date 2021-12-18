import { action } from 'typesafe-actions';
import { JobDetails } from '../../../components/CreateJob';

export const FETCH_JOBS = 'job/FETCH_JOBS';
export const FETCH_JOBS_SUCCESS = 'job/FETCH_JOBS_SUCCESS';
export const FILTER_JOBS_BY_DATE = 'job/FILTER_JOBS_BY_DATE';
export const FILTER_JOBS_BY_LANGUAGE = 'job/FILTER_JOBS_BY_LANGUAGE';
export const FETCH_CREATED_JOBS = 'job/FETCH_CREATED_JOBS';

export const fetchJobs = () => action(FETCH_JOBS);
export const fetchJobsSuccess = (jobs: { data: JobDetails[]}) => action(FETCH_JOBS_SUCCESS, { jobs: jobs.data });
export const filterJobsByDate = (datePosted: string) => action(FILTER_JOBS_BY_DATE, { datePosted });
export const filterJobsByLanguage = (language: string) => action(FILTER_JOBS_BY_LANGUAGE, { language });
export const fetchCreatedJobs = (id: string) => action(FETCH_CREATED_JOBS, {id});