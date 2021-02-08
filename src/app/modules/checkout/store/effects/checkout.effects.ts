import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { CheckoutActions } from '../actions';
import Rental from '../models/rental';
import { selectRental } from '../selectors/checkout.selector';

@Injectable()
export class CheckoutEffects {
  constructor(
    private actions$: Actions,
    private store: Store
  ) {
  }

  changeVehicle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.changeVehicle),
      mergeMap(() =>
        this.store.select(selectRental).pipe(
          map((rental: Rental) => !!rental.vehicleId)
        )
      ),
      map((result) => {
        return result ? CheckoutActions.askChangeVehicle() : CheckoutActions.confirmChangeVehicle();
      })
    )
  );
}
