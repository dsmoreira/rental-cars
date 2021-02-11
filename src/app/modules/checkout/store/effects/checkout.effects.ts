import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeMap, map, tap, catchError, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { CheckoutActions } from '../actions';
import { CheckoutService } from '../../services/checkout.service';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { NavigationActions } from '../../../../store/actions';
import { NotificationService } from '../../../../core/services/notification.service';
import { Rental } from '../models/rental';
import {
  selectIsLogged,
  selectUserId,
} from '../../../../store/selectors/auth.selector';
import { selectRental } from '../selectors/checkout.selector';

@Injectable()
export class CheckoutEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private confirmDialogService: ConfirmDialogService,
    private checkoutService: CheckoutService,
    private notificationService: NotificationService
  ) {}

  changeVehicle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.changeVehicle),
      mergeMap(() =>
        this.store.select(selectRental).pipe(
          take(1),
          map((rental: Rental) => !!rental.vehicle)
        )
      ),
      map((result) => {
        return result
          ? CheckoutActions.askChangeVehicle()
          : CheckoutActions.confirmChangeVehicle();
      })
    )
  );

  askChangeVehicle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.askChangeVehicle),
      mergeMap(() =>
        this.confirmDialogService
          .confirm(
            'Você já tem um veículo selecionado. Deseja alterar o veículo?'
          )
          .pipe(take(1))
      ),
      map((result) => {
        return result
          ? CheckoutActions.confirmChangeVehicle()
          : CheckoutActions.rejectChangeVehicle();
      })
    )
  );

  decreaseHours$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.decreaseHours),
      mergeMap(() =>
        this.store.select(selectRental).pipe(
          take(1),
          map((rental: Rental) => rental.hours === 1)
        )
      ),
      map((result) => {
        return result
          ? CheckoutActions.askRemoveVehicle()
          : CheckoutActions.confirmDecreaseHours();
      })
    )
  );

  askRemoveVehicle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.askRemoveVehicle),
      mergeMap(() =>
        this.confirmDialogService
          .confirm('Deseja remover o veículo?')
          .pipe(take(1))
      ),
      map((result) => {
        return result
          ? CheckoutActions.confirmRemoveVehicle()
          : CheckoutActions.rejectRemoveVehicle();
      })
    )
  );

  saveRental$ = createEffect(() => {
    let currentRental: Rental;

    return this.actions$.pipe(
      ofType(CheckoutActions.saveRental),
      tap(({ rental }) => (currentRental = rental)),
      mergeMap(() => this.store.select(selectUserId).pipe(take(1))),
      mergeMap((userId) => {
        return !!userId
          ? this.checkoutService.save(currentRental, userId).pipe(
              map(() => CheckoutActions.saveRentalSuccess()),
              catchError((error) => {
                return of(
                  CheckoutActions.saveRentalError({ error: { message: error } })
                );
              })
            )
          : of(
              NavigationActions.navigationGo({
                path: ['/login'],
                returnAfterLoginUrl: '/checkout',
              })
            );
      })
    );
  });

  saveRentalSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CheckoutActions.saveRentalSuccess),
      map((result) => NavigationActions.navigationGo({ path: ['/books'] }))
    );
  });

  saveRentalError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CheckoutActions.saveRentalError),
      tap(({ error }) => this.notificationService.notifyError(error))
    );
  });
}
