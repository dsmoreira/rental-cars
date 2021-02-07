import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { NavigationActions } from '../../../../store/actions/index';
import { NotificationService } from '../../../../core/services/notification.service';
import { VehicleActions } from '../actions';
import { VehicleService } from '../../services/vehicle.service';

@Injectable()
export class VehicleEffects {
  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
    private vehicleService: VehicleService
  ) {}

  homeNavigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationActions.navigationPerfomed),
      filter((action) => action.payload.path === ''),
      concatMap(() => of(VehicleActions.getVehicles()))
    )
  );

  getVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.getVehicles),
      mergeMap(() =>
        this.vehicleService.availableVehicles().pipe(
          map((vehicles) =>
            VehicleActions.getVehiclesSuccess({ payload: { vehicles } })
          ),
          catchError((error) => {
            return of(
              VehicleActions.getVehiclesError({
                payload: { error: { message: error } },
              })
            );
          })
        )
      )
    )
  );

  getVehiclesError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.getVehiclesError),
      map((action: any) => action.payload),
      tap((payload) => this.notificationService.notifyError(payload.error))
    )
  );
}
