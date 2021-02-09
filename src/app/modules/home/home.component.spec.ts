import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';

import { HeaderModule } from '../../core/layout/header/header.module';
import { HomeComponent } from './home.component';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { VehicleCardModule } from '../../shared/components/vehicle-card/vehicle-card.module';
import { vehicles } from '../../../../__mocks__/DbMock';
import { VehicleState } from './store/reducers/vehicle.reducer';

const state: VehicleState = {
  vehicles,
  loading: false,
};

const initialState = {
  vehicle: state,
};

describe('HomeComponent', () => {
  let renderResult: RenderResult<HomeComponent>;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;

  beforeEach(async () => {
    renderResult = await render(HomeComponent, {
      imports: [
        BrowserModule,
        CommonModule,
        HeaderModule,
        LoadingModule,
        VehicleCardModule,
      ],
      providers: [provideMockStore({ initialState })],
    });
    fixture = renderResult.fixture;
    store = fixture.componentRef.injector.get(MockStore);
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('o loading deve ser exibido de acordo com o estado do store', () => {
    const { getByTestId, queryByTestId } = renderResult;

    expect(queryByTestId('home-loading')).toBeFalsy();

    store.setState({
      vehicle: {
        ...state,
        loading: true,
      },
    });

    fixture.detectChanges();

    expect(getByTestId('home-loading')).toBeInTheDocument();
  });

  it('somente após o carregamento terminar é que a listagem de veículos deve ser exibida', () => {
    const { getByTestId, queryByTestId } = renderResult;

    store.setState({
      vehicle: {
        ...state,
        loading: true,
      },
    });

    fixture.detectChanges();

    expect(queryByTestId('vehicle-list')).toBeFalsy();

    store.setState({
      vehicle: {
        ...state,
        loading: false,
      },
    });

    fixture.detectChanges();

    expect(getByTestId('vehicle-list')).toBeInTheDocument();
  });

  it('a listagem de veículos deve ser categorizada por veículos Básicos, Completos e de Luxo', () => {
    const { getByTestId } = renderResult;

    expect(getByTestId('home-vehicles-basic')).toBeInTheDocument();
    expect(getByTestId('home-vehicles-complete')).toBeInTheDocument();
    expect(getByTestId('home-vehicles-lux')).toBeInTheDocument();
  });

  it('a listagem dos veículos básicos deve exibir somentes os veículos dessa categoria retornardos pelo store', () => {
    const { queryAllByTestId } = renderResult;

    expect(queryAllByTestId('home-vehicle-item-basic').length).toBe(
      state.vehicles.filter((x) => x.category === 'básico').length
    );
  });

  it('a listagem dos veículos completos deve exibir somentes os veículos dessa categoria retornardos pelo store', () => {
    const { queryAllByTestId } = renderResult;

    expect(queryAllByTestId('home-vehicle-item-complete').length).toBe(
      state.vehicles.filter((x) => x.category === 'completo').length
    );
  });

  it('a listagem dos veículos de luxo deve exibir somentes os veículos dessa categoria retornardos pelo store', () => {
    const { queryAllByTestId } = renderResult;

    expect(queryAllByTestId('home-vehicle-item-lux').length).toBe(
      state.vehicles.filter((x) => x.category === 'luxo').length
    );
  });
});
