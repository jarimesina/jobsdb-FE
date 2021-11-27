import { RootState } from 'MyTypes';
import { createSelector } from 'reselect';

export const selectAuth = (state: RootState) => state.auth;

export const selectUserId = createSelector(
  selectAuth,
  (auth) => auth.userId,
)