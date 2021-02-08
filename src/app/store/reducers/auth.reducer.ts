import { Action, createReducer, on } from '@ngrx/store';

import { AuthActions } from '../actions';
export interface AuthState {
  token: string;
  userId: string;
  name: string;
  loading: boolean;
}

export const initialState: AuthState = {
  token: '',
  userId: '',
  name: '',
  loading: false,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginSuccess, (state, { loginResult }) => ({
    ...state,
    userId: loginResult.id,
    token: loginResult.token,
    name: loginResult.name,
    loading: false,
  })),
  on(AuthActions.loginError, (state) => ({
    ...state,
    loading: false,
  }))
);

export function reducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return authReducer(state, action);
}
