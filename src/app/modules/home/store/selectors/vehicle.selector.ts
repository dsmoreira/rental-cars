import { createSelector } from '@ngrx/store';
import { Vehicle } from '../models/vehicle';

import { VehicleState } from '../reducers/vehicle.reducer';

export const selectVehicle = createSelector(
  (state: any) => state.vehicle,
  (state: VehicleState) => state
);

export const selectVehicles = createSelector(
  selectVehicle,
  (vehicle: VehicleState): Vehicle[] => vehicle.vehicles
);

export const selectBasicVehicles = createSelector(
  selectVehicle,
  (vehicle: VehicleState): Vehicle[] =>
    vehicle.vehicles.filter((x) => x.category === 'básico')
);

export const selectCompleteVehicles = createSelector(
  selectVehicle,
  (vehicle: VehicleState): Vehicle[] =>
    vehicle.vehicles.filter((x) => x.category === 'completo')
);

export const selectLuxVehicles = createSelector(
  selectVehicle,
  (vehicle: VehicleState): Vehicle[] =>
    vehicle.vehicles.filter((x) => x.category === 'luxo')
);

export const selectLoading = createSelector(
  selectVehicle,
  (vehicle: VehicleState): boolean => vehicle.loading
);
