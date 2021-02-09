import { Action, createReducer, on } from '@ngrx/store';

import { Rental } from '../models/rental';
import { CheckoutActions } from '../actions/index';

const inicialRental: Rental = {
  vehicleId: '',
  hourlyValue: 0,
  hours: 0,
  value: 0,
  date: null,
};

export interface CheckoutState {
  rental: Rental;
  loading: boolean;
  nextRental: Rental | null;
}

export const initialState: CheckoutState = {
  rental: inicialRental,
  loading: false,
  nextRental: null,
};

const checkoutReducer = createReducer(
  initialState,
  on(CheckoutActions.changeVehicle, (state, { vehicle }) => ({
    ...state,
    nextRental: {
      vehicleId: vehicle.id,
      hourlyValue: vehicle.hourlyValue,
      hours: 1,
      value: vehicle.hourlyValue,
      date: null,
    },
  })),
  on(CheckoutActions.confirmChangeVehicle, (state) => ({
    ...state,
    rental: state.nextRental as Rental,
    nextRental: null,
  })),
  on(CheckoutActions.rejectChangeVehicle, (state) => ({
    ...state,
    nextRental: null,
  })),
  on(CheckoutActions.increaseHours, (state) => ({
    ...state,
    rental: {
      ...state.rental,
      hours: state.rental.hours + 1,
      value: state.rental.hourlyValue * (state.rental.hours + 1),
    },
  })),
  on(CheckoutActions.confirmDecreaseHours, (state) => ({
    ...state,
    rental: {
      ...state.rental,
      hours: state.rental.hours - 1,
      value: state.rental.hourlyValue * (state.rental.hours - 1),
    },
  })),
  on(CheckoutActions.confirmRemoveVehicle, (state) => ({
    ...state,
    rental: { ...inicialRental },
  }))
);

export function reducer(
  state: CheckoutState | undefined,
  action: Action
): CheckoutState {
  return checkoutReducer(state, action);
}
