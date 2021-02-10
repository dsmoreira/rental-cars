import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NavigationActions } from '../../store/actions';
import { CheckoutActions } from './store/actions';
import { Rental } from './store/models/rental';
import { selectRental } from './store/selectors/checkout.selector';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  rental$: Observable<Rental>;

  constructor(private store: Store) {
    this.rental$ = this.store.select(selectRental);
  }

  ngOnInit(): void {}

  goHome(): void {
    this.store.dispatch(NavigationActions.navigationGo({ path: ['/'] }));
  }

  checkout(rental: Rental): void {
    this.store.dispatch(CheckoutActions.saveRental({ rental }));
  }
}
