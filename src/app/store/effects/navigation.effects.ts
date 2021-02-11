import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { debounce, filter, map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { NavigationActions } from '../actions';

let navigateAfterLogin: string | undefined;

@Injectable()
export class NavigationEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store: Store<any>
  ) {
    this.listenToRouter();
  }

  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationActions.navigationGo),
      tap(({ path, queryParams, extras, returnAfterLoginUrl }) => {
        if (!navigateAfterLogin && returnAfterLoginUrl) {
          navigateAfterLogin = returnAfterLoginUrl;
        }

        if (path[0] === '/') {
          navigateAfterLogin = undefined;
        }

        if (path[0] === '/books' && !!navigateAfterLogin) {
          this.router.navigate([navigateAfterLogin], {
            queryParams,
            ...extras,
          });
          navigateAfterLogin = undefined;
        } else {
          this.router.navigate(path, { queryParams, ...extras });
        }
      }),
      mergeMap(() => of(NavigationActions.navigationEnd()))
    )
  );

  private navEnd$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd)
  );

  private listenToRouter(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationStart),
        debounce(() => this.navEnd$)
      )
      .subscribe((event: any) => {
        const route = { ...event.snapshot };
        const { params, queryParams, data, _routerState } = route;

        const routerState = {
          params,
          queryParams,
          data,
          path: _routerState.url,
        };

        this.store.dispatch(NavigationActions.navigationPerfomed(routerState));
      });
  }
}
