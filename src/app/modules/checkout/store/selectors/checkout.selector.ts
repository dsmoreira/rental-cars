import { createSelector } from '@ngrx/store';
import Rental from '../models/rental';

import { CheckoutState } from '../reducers/checkout.reducer';

export const selectCheckout = (state: any) => state.checkout;

export const selectRental = createSelector(
    selectCheckout,
    (checkout: CheckoutState): Rental => checkout.rental
);
