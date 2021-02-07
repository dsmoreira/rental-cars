import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { debounce, filter, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import { NavigationActions } from '../actions';

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
      map((action: any) => action.payload),
      tap(({ path, queryParams, extras }) =>
        this.router.navigate(path, { queryParams, ...extras })
      )
    )
  );

  navigateBack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationActions.navigationBack),
      tap(() => this.location.back())
    )
  );

  navigateForward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationActions.navigationForward),
      tap(() => this.location.forward())
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
        const { params, queryParams, data, routeConfig } = route;

        const routerState = {
          params,
          queryParams,
          data,
          path: routeConfig.path,
        };

        this.store.dispatch(
          NavigationActions.navigationPerfomed({ payload: routerState })
        );
      });
  }
}
