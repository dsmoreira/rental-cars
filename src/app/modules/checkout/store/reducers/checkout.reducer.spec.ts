import { CheckoutActions } from '../actions';
import { CheckoutReducer } from './';
import { Vehicle } from '../../../home/store/models/vehicle';

const vehicle: Vehicle = {
  id: '95ef282b-4378-4447-bfe6-bc362184ca66',
  make: 'Ford',
  model: 'Eco Sport SE',
  year: 2020,
  hourlyValue: 20.0,
  fuel: ['gasolina", "álcool'],
  trunkCapacity: '350 litro',
  category: 'completo',
};

describe('CheckoutReducer', () => {
  it('deve retornar um estado inicial', () => {
    const initialState = { ...CheckoutReducer.initialState };
    const action = {
      type: 'Unknown',
    };

    const state = CheckoutReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('ao solictar troca do veículo o registro deve ser armazenado enquanto aguarda confirmação', () => {
    const initialState = { ...CheckoutReducer.initialState };

    const newState: CheckoutReducer.CheckoutState = {
      ...initialState,
      nextRental: {
        vehicle,
        hours: 1,
        value: vehicle.hourlyValue,
        date: undefined,
      },
    };

    const action = CheckoutActions.changeVehicle({ vehicle });

    const state = CheckoutReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao confirmar alteração veículo deve ser alteração', () => {
    const initialState = { ...CheckoutReducer.initialState };

    initialState.nextRental = {
      vehicle,
      hours: 1,
      value: vehicle.hourlyValue,
      date: undefined,
    };

    const newState: CheckoutReducer.CheckoutState = {
      rental: {
        vehicle,
        hours: 1,
        value: vehicle.hourlyValue,
        date: undefined,
      },
      loading: false,
      nextRental: null,
    };

    const action = CheckoutActions.confirmChangeVehicle();

    const state = CheckoutReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao rejeitar alteração veículo não deve ser trocado e o veículo que estava aguardando deve ser apagado', () => {
    const initialState = { ...CheckoutReducer.initialState };

    initialState.nextRental = {
      vehicle,
      hours: 1,
      value: vehicle.hourlyValue,
      date: undefined,
    };

    const newState: CheckoutReducer.CheckoutState = {
      ...initialState,
      nextRental: null,
    };

    const action = CheckoutActions.rejectChangeVehicle();

    const state = CheckoutReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao solicitar incremento de hora a mesma deve ser incrementada e o valor calculado', () => {
    const initialState = { ...CheckoutReducer.initialState };

    initialState.rental = {
      vehicle,
      hours: 1,
      value: vehicle.hourlyValue,
      date: undefined,
    };

    const newState: CheckoutReducer.CheckoutState = {
      rental: {
        vehicle,
        hours: 2,
        value: 2 * vehicle.hourlyValue,
        date: undefined,
      },
      loading: false,
      nextRental: null,
    };

    const action = CheckoutActions.increaseHours();

    const state = CheckoutReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao solicitar redução de hora a mesma deve ser reduzida e o valor calculado', () => {
    const initialState = { ...CheckoutReducer.initialState };

    initialState.rental = {
      vehicle,
      hours: 2,
      value: 2 * vehicle.hourlyValue,
      date: undefined,
    };

    const newState: CheckoutReducer.CheckoutState = {
      rental: {
        vehicle,
        hours: 1,
        value: vehicle.hourlyValue,
        date: undefined,
      },
      loading: false,
      nextRental: null,
    };

    const action = CheckoutActions.confirmDecreaseHours();

    const state = CheckoutReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao confirmar a remoção do veículo o mesmo deve voltar ao estado inicial', () => {
    const initialState = { ...CheckoutReducer.initialState };

    initialState.rental = {
      vehicle,
      hours: 1,
      value: vehicle.hourlyValue,
      date: undefined,
    };

    const newState: CheckoutReducer.CheckoutState = {
      ...CheckoutReducer.initialState,
    };

    const action = CheckoutActions.confirmRemoveVehicle();

    const state = CheckoutReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });
});
