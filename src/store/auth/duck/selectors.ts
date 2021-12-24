import { RootState } from 'MyTypes';
import { createSelector } from 'reselect';

export const selectAuth = (state: RootState) => state.auth;

export const selectUserId = createSelector(
  selectAuth,
  (auth) => auth.userId,
)

export const selectToken = createSelector(
  selectAuth,
  (auth) => auth.token,
)

export const selectProfile = createSelector(
  selectAuth,
  (auth) => auth.profile,
)