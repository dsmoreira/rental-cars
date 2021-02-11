import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthActions, NavigationActions } from '../../store/actions';
import { selectLoading } from '../../store/selectors/auth.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {}

  login(): void {
    if (this.username.valid && this.password.valid) {
      this.store.dispatch(
        AuthActions.login({
          loginInfo: {
            userName: this.username.value,
            password: this.password.value,
          },
        })
      );
    }
  }

  returnHome(): void {
    this.store.dispatch(NavigationActions.navigationGo({ path: ['/'] }));
  }
}
