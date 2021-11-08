import { createSelector } from 'reselect';
import { RootState } from 'MyTypes';

export const selectJobs = (state: RootState) => state.jobs

export const selectJobsList = createSelector(
  selectJobs,
  (jobs) => jobs.jobs,
);
