import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';

import { CheckoutActions } from '../../../modules/checkout/store/actions';
import {
  CheckoutState,
  initialState,
} from '../../../modules/checkout/store/reducers/checkout.reducer';
import { Rental } from '../../../modules/checkout/store/models/rental';
import { vehicles } from '../../../../../__mocks__/DbMock';
import { VehicleActionsComponent } from './vehicle-actions.component';

const vehicle = vehicles[0];
const diffVehicle = vehicles[1];

const rental: Rental = {
  vehicle,
  hours: 4,
  value: vehicle.hourlyValue * 4,
  date: new Date(Date.now()),
};

const state: CheckoutState = {
  loading: false,
  nextRental: null,
  rental,
};

const appState = { checkout: state };

describe('VehicleActionsComponent', () => {
  let renderResult: RenderResult<VehicleActionsComponent>;
  let fixture: ComponentFixture<VehicleActionsComponent>;
  let component: VehicleActionsComponent;
  let store: MockStore;

  let storeSpy: jest.SpyInstance;

  beforeEach(async () => {
    renderResult = await render(VehicleActionsComponent, {
      imports: [BrowserModule, MatButtonModule, MatIconModule],
      providers: [provideMockStore({ initialState })],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;

    store = fixture.componentRef.injector.get(MockStore);

    storeSpy = jest.spyOn(store, 'dispatch');
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('as ações devem aparecer somente se um veículo for passado', () => {
    const { getByTestId, queryByTestId } = renderResult;

    expect(queryByTestId('vehicle-actions')).toBeFalsy();

    component.vehicle = vehicle;

    fixture.detectChanges();

    expect(getByTestId('vehicle-actions')).toBeInTheDocument();
  });

  it('o botão de selecionar só deve apareser se o veículo atualmente selecionado for diferente do veículo do componente', () => {
    const { getByTestId, queryByTestId } = renderResult;

    expect(queryByTestId('vehicle-actions-select-btn')).toBeFalsy();

    component.vehicle = diffVehicle;

    store.setState(appState);

    fixture.detectChanges();

    expect(getByTestId('vehicle-actions-select-btn')).toBeInTheDocument();
  });

  it('o botão de selecionar deve emitir a ação de troca de veículo', () => {
    const { getByTestId } = renderResult;

    component.vehicle = diffVehicle;

    store.setState(appState);

    fixture.detectChanges();

    getByTestId('vehicle-actions-select-btn').click();

    expect(storeSpy).toHaveBeenCalledWith(
      CheckoutActions.changeVehicle({ vehicle: diffVehicle })
    );
  });

  it('os botões de adicionar e remover horas deve aparecer quando o veículo selecionado for o mesmo do veículo do componente', () => {
    const { getByTestId, queryByTestId } = renderResult;

    expect(queryByTestId('vehicle-actions-add-hour')).toBeFalsy();
    expect(queryByTestId('vehicle-actions-remove-hour')).toBeFalsy();

    component.vehicle = vehicle;

    store.setState(appState);

    fixture.detectChanges();

    expect(getByTestId('vehicle-actions-add-hour')).toBeInTheDocument();
    expect(getByTestId('vehicle-actions-remove-hour')).toBeInTheDocument();
  });

  it('o botão de adicionar hora deve emitir a ação de aumentar horar', () => {
    const { getByTestId } = renderResult;

    component.vehicle = vehicle;

    store.setState(appState);

    fixture.detectChanges();

    getByTestId('vehicle-actions-add-hour').click();

    expect(storeSpy).toHaveBeenCalledWith(CheckoutActions.increaseHours());
  });

  it('o botão de remover hora deve emitir a ação de diminuir horar', () => {
    const { getByTestId } = renderResult;

    component.vehicle = vehicle;

    store.setState(appState);

    fixture.detectChanges();

    getByTestId('vehicle-actions-remove-hour').click();

    expect(storeSpy).toHaveBeenCalledWith(CheckoutActions.decreaseHours());
  });

  it('a quantidade de horas deve aparecer quando o veículo selecionado for o mesmo do veículo do componente ', () => {
    const { getByTestId, queryByTestId } = renderResult;

    expect(queryByTestId('vehicle-actions-hours')).toBeFalsy();

    component.vehicle = vehicle;

    store.setState(appState);

    fixture.detectChanges();

    expect(getByTestId('vehicle-actions-hours')).toBeInTheDocument();
  });
});
