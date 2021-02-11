import { Action, createReducer, on } from '@ngrx/store';

import { Rental } from '../models/rental';
import { CheckoutActions } from '../actions/index';

const inicialRental: Rental = {
  vehicle: undefined,
  hours: 0,
  value: 0,
  date: undefined,
};

const calculaValor = (valor: number | undefined, horas: number) =>
  !!valor ? valor * horas : 0;

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
      vehicle,
      hours: 1,
      value: vehicle.hourlyValue,
      date: undefined,
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
      value: calculaValor(
        state.rental.vehicle?.hourlyValue,
        state.rental.hours + 1
      ),
    },
  })),
  on(CheckoutActions.confirmDecreaseHours, (state) => ({
    ...state,
    rental: {
      ...state.rental,
      hours: state.rental.hours - 1,
      value: calculaValor(
        state.rental.vehicle?.hourlyValue,
        state.rental.hours - 1
      ),
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
