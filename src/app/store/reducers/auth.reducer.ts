import { Action, createReducer } from '@ngrx/store';

export interface AuthState {
  token: string;
  name: string;
}

export const initialState: AuthState = {
  token: '',
  name: '',
};

const authReducer = createReducer(initialState);

export function reducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return authReducer(state, action);
}
