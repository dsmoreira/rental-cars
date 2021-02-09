import { createAction, props } from '@ngrx/store';

import { AppError } from '../../core/models/app-error';
import { LoginInfo } from '../models/login-info';
import { LoginResult } from '../models/login-result';
import { User } from '../models/user';

export const login = createAction(
  '[Auth] Login',
  props<{ loginInfo: LoginInfo }>()
);

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ loginResult: LoginResult }>()
);

export const loginError = createAction(
  '[Auth] Login error',
  props<{ error: AppError }>()
);

export const signup = createAction('[Auth] Signup', props<{ user: User }>());

export const signupSuccess = createAction('[Auth] Signup success');

export const signupError = createAction(
  '[Auth] Signup error',
  props<{ error: AppError }>()
);
