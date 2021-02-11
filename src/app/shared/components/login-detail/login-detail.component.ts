import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthActions, NavigationActions } from '../../../store/actions';
import {
  selectIsLogged,
  selectUserName,
} from '../../../store/selectors/auth.selector';

@Component({
  selector: 'app-login-detail',
  templateUrl: './login-detail.component.html',
  styleUrls: ['./login-detail.component.scss'],
})
export class LoginDetailComponent implements OnInit {
  isLogged$: Observable<boolean>;
  userName$: Observable<string>;

  constructor(private store: Store) {
    this.isLogged$ = this.store.select(selectIsLogged);
    this.userName$ = this.store.select(selectUserName);
  }

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  login(): void {
    this.store.dispatch(NavigationActions.navigationGo({ path: ['/login'] }));
  }
}
