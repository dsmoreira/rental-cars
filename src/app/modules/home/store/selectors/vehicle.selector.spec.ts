import { vehicles } from '../../../../../../__mocks__/DbMock';
import {
  selectVehicle,
  selectVehicles,
  selectBasicVehicles,
  selectCompleteVehicles,
  selectLuxVehicles,
  selectLoading,
} from './vehicle.selector';
import { VehicleState } from '../reducers/vehicle.reducer';
import { from } from 'rxjs';

const state: VehicleState = {
  vehicles,
  loading: true,
};

const initialState = {
  vehicle: state,
};

describe('VehicleSelector', () => {
  it('deve retornar o store dos veículos', () => {
    const result = selectVehicle.projector(initialState.vehicle);
    expect(result).toMatchObject(state);
  });

  it('deve retornar a lista de veículos', () => {
    const result = selectVehicles.projector(initialState.vehicle);
    expect(result).toMatchObject(state.vehicles);
  });

  it('deve retornar a lista de veículos básicos', () => {
    const result = selectBasicVehicles.projector(initialState.vehicle);
    expect(result).toMatchObject(
      state.vehicles.filter((x) => x.category === 'básico')
    );
  });

  it('deve retornar a lista de veículos completos', () => {
    const result = selectCompleteVehicles.projector(initialState.vehicle);
    expect(result).toMatchObject(
      state.vehicles.filter((x) => x.category === 'completo')
    );
  });

  it('deve retornar a lista de veículos de luxo', () => {
    const result = selectLuxVehicles.projector(initialState.vehicle);
    expect(result).toMatchObject(
      state.vehicles.filter((x) => x.category === 'luxo')
    );
  });

  it('deve retornar o loading', () => {
    const result = selectLoading.projector(initialState.vehicle);
    expect(result).toBe(state.loading);
  });
});
