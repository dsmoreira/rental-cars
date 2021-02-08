import { createSelector } from '@ngrx/store';

import { AuthState } from '../reducers/auth.reducer';

export const selectAuth = (state: any) => state.auth;

export const selectIsLogged = createSelector(
  selectAuth,
  (auth: AuthState): boolean => !!auth.token
);

export const selectUserId = createSelector(
  selectAuth,
  (auth: AuthState): string => auth.userId
);
