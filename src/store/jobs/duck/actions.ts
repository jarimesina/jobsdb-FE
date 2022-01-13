import { action } from 'typesafe-actions';
import { JobDetails } from '../../../components/CreateJob';

export const FETCH_JOBS = 'job/FETCH_JOBS';
export const FETCH_JOBS_SUCCESS = 'job/FETCH_JOBS_SUCCESS';
export const FILTER_JOBS_BY_DATE = 'job/FILTER_JOBS_BY_DATE';
export const FILTER_JOBS_BY_LANGUAGE = 'job/FILTER_JOBS_BY_LANGUAGE';
export const FETCH_CREATED_JOBS = 'job/FETCH_CREATED_JOBS';

export const fetchJobs = (skip?: number, limit?: number, language?: string, dateRange?: string) => action(FETCH_JOBS, { skip, limit, language, dateRange});
export const fetchJobsSuccess = (jobs: { jobs: JobDetails[], total: number}) => action(FETCH_JOBS_SUCCESS, { jobs: jobs.jobs, total: jobs.total });
export const filterJobsByDate = (datePosted: string) => action(FILTER_JOBS_BY_DATE, { datePosted });
export const filterJobsByLanguage = (language: string) => action(FILTER_JOBS_BY_LANGUAGE, { language });
export const fetchCreatedJobs = (id: string) => action(FETCH_CREATED_JOBS, {id});