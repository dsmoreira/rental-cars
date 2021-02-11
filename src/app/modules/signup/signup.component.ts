import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthActions, NavigationActions } from '../../store/actions';
import { selectLoading } from '../../store/selectors/auth.selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  loading$: Observable<boolean>;
  newUser: FormGroup;

  constructor(fb: FormBuilder, private store: Store) {
    this.loading$ = this.store.select(selectLoading);

    this.newUser = fb.group({
      name: ['', Validators.required],
      document: ['', Validators.required],
      password: ['', Validators.required],
      birthdate: [null, Validators.required],
      zipcode: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  signup(): void {
    if (this.newUser.valid) {
      this.store.dispatch(AuthActions.signup({ user: this.newUser.value }));
    }
  }

  returnLogin(): void {
    this.store.dispatch(NavigationActions.navigationGo({ path: ['/login'] }));
  }
}
