import { createAction, props } from '@ngrx/store';

import Rental from '../models/rental';
import Vehicle from '../../../home/store/models/vehicle';

export const changeVehicle = createAction('[Checkout] Change vehicle', props<{ vehicle: Vehicle}>());

export const askChangeVehicle = createAction('[Checkout] Aks change vehicle');

export const confirmChangeVehicle = createAction('[Checkout] Confirm change vehicle');

export const rejectChangeVehicle = createAction('[Checkout] Reject change vehicle');

export const increaseHours = createAction('[Checkout] Increase hours');

export const validateDecreaseHours = createAction('[Checkout] Validate decrease hours');

export const decreaseHours = createAction('[Checkout] Decrease hours');

export const askRemoveVehicle = createAction('[Checkout] Aks remove vehicle');

export const confirmRemoveVehicle = createAction('[Checkout] Confirm remove vehicle');

export const rejectRemoveVehicle = createAction('[Checkout] Reject remove vehicle');

export const saveRental = createAction('[Checkout] Save rental', props<{ rental: Rental}>());
