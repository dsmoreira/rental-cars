import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeMap, map, tap, catchError, take } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

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
          take(1),
          map((result) =>
            !!result.length
              ? AuthActions.loginSuccess({
                  loginResult: {
                    id: result[0].id as string,
                    token: result[0].token as string,
                    name: result[0].name,
                  },
                })
              : AuthActions.loginError({
                  error: { message: 'Usuário ou senha inválidos!' },
                })
          ),
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
      map(() => NavigationActions.navigationGo({ path: ['/books'] }))
    );
  });

  loginError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginError),
      tap(({ error }) => this.notificationService.notifyError(error)),
      map(() => AuthActions.noopAction())
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ user }) =>
        this.authService.signup(user).pipe(
          take(1),
          map(() => AuthActions.signupSuccess()),
          catchError((error) => {
            return of(AuthActions.signupError({ error: { message: error } }));
          })
        )
      )
    );
  });

  signupSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signupSuccess),
      tap(() =>
        this.notificationService.notifySucess('Usuário cadastrado com sucesso!')
      ),
      map(() => NavigationActions.navigationGo({ path: ['/login'] }))
    );
  });

  signupError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signupError),
      tap(({ error }) => this.notificationService.notifyError(error)),
      map(() => AuthActions.noopAction())
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => NavigationActions.navigationGo({ path: ['/'] }))
    );
  });
}
