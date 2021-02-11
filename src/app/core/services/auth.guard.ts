import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NavigationActions } from '../../store/actions';
import { selectIsLogged } from '../../store/selectors/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsLogged).pipe(
      map((isLogged) => {
        if (!isLogged) {
          this.store.dispatch(
            NavigationActions.navigationGo({ path: ['/login'] })
          );
        }
        return isLogged;
      })
    );
  }
}
