import { Action, createReducer, on } from '@ngrx/store';

import { Vehicle } from '../models/vehicle';
import { VehicleActions } from '../actions/index';

export interface VehicleState {
  vehicles: Vehicle[];
  loading: boolean;
}

export const initialState: VehicleState = {
  vehicles: [],
  loading: false,
};

const vehiclesReducer = createReducer(
  initialState,
  on(VehicleActions.getVehicles, (state) => ({
    ...state,
    loading: true,
  })),
  on(VehicleActions.getVehiclesSuccess, (state, { payload }) => ({
    ...state,
    vehicles: payload.vehicles,
    loading: false,
  })),
  on(VehicleActions.getVehiclesError, (state) => ({
    ...state,
    loading: false,
  }))
);

export function reducer(
  state: VehicleState | undefined,
  action: Action
): VehicleState {
  return vehiclesReducer(state, action);
}
