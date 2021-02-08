import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthActions, NavigationActions } from '../actions';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.loginInfo).pipe(
          map((result) => AuthActions.loginSuccess({ loginResult: result })),
          catchError((error) => {
            return of(AuthActions.loginError({ error: { message: error } }));
          })
        )
      )
    );
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(() =>
        NavigationActions.navigationGo({ payload: { path: ['/books'] } })
      )
    );
  });

  loginError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginError),
      tap(({ error }) => this.notificationService.notifyError(error))
    );
  });
}
