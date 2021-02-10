import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Rental } from '../../../modules/checkout/store/models/rental';
import { selectRental } from '../../../modules/checkout/store/selectors/checkout.selector';
import { NavigationActions } from '../../../store/actions';

@Component({
  selector: 'app-checkout-resume',
  templateUrl: './checkout-resume.component.html',
  styleUrls: ['./checkout-resume.component.scss'],
})
export class CheckoutResumeComponent implements OnInit {
  rental$: Observable<Rental>;

  constructor(private store: Store) {
    this.rental$ = this.store.select(selectRental);
  }

  ngOnInit(): void {}

  checkout(): void {
    this.store.dispatch(
      NavigationActions.navigationGo({ path: ['/checkout'] })
    );
  }
}
