import { createAction, props } from '@ngrx/store';

import { AppError } from '../../../../core/models/app-error';
import { Vehicle } from '../models/vehicle';

export const getVehicles = createAction('[Vehicles] Get');

export const getVehiclesSuccess = createAction(
  '[Vehicles] Get Success',
  props<{ vehicles: Vehicle[] }>()
);

export const getVehiclesError = createAction(
  '[Vehicles] Get Error',
  props<{ error: AppError }>()
);
