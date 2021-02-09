import { createSelector } from '@ngrx/store';
import { Rental } from '../models/rental';

import { CheckoutState } from '../reducers/checkout.reducer';

export const selectCheckout = createSelector(
  (state: any) => state.checkout,
  (state: CheckoutState) => state
);

export const selectRental = createSelector(
  selectCheckout,
  (checkout: CheckoutState): Rental => checkout.rental
);
