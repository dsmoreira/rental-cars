import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NavigationActions } from '../../store/actions';
import { CheckoutActions } from './store/actions';
import { Rental } from './store/models/rental';
import {
  selectRental,
  selectLoading,
} from './store/selectors/checkout.selector';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  rental$: Observable<Rental>;
  loading$: Observable<boolean>;
  rentalDate: FormControl;
  minDate: Date;

  constructor(private store: Store) {
    this.rental$ = this.store.select(selectRental);
    this.loading$ = this.store.select(selectLoading);
    this.rentalDate = new FormControl('', Validators.required);

    this.minDate = new Date(Date.now());
  }

  ngOnInit(): void {}

  goHome(): void {
    this.store.dispatch(NavigationActions.navigationGo({ path: ['/'] }));
  }

  checkout(rental: Rental): void {
    if (this.rentalDate.valid) {
      this.store.dispatch(
        CheckoutActions.saveRental({
          rental: { ...rental, date: this.rentalDate.value },
        })
      );
    }
  }
}
