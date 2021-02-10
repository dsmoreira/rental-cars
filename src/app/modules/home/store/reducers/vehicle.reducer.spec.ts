import { vehicles } from '../../../../../../__mocks__/DbMock';
import { VehicleActions } from '../actions';
import { VehicleReducer } from './';

describe('VehicleReducer', () => {
  it('deve retornar um estado inicial', () => {
    const { initialState } = VehicleReducer;
    const action = {
      type: 'Unknown',
    };

    const state = VehicleReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('ao carregar veículos deve iniciar o loading', () => {
    const { initialState } = VehicleReducer;

    const newState: VehicleReducer.VehicleState = {
      vehicles: [],
      loading: true,
    };

    const action = VehicleActions.getVehicles();

    const state = VehicleReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao carregar com sucesso deve parar o loading e conter a lista de veículos', () => {
    const { initialState } = VehicleReducer;

    const newState: VehicleReducer.VehicleState = {
      vehicles,
      loading: false,
    };

    const action = VehicleActions.getVehiclesSuccess({ vehicles });

    const state = VehicleReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao carregar com erro deve parar o loading', () => {
    const { initialState } = VehicleReducer;

    const newState: VehicleReducer.VehicleState = {
      vehicles: [],
      loading: false,
    };

    const action = VehicleActions.getVehiclesError({
      error: { message: 'Opss!!' },
    });

    const state = VehicleReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });
});
