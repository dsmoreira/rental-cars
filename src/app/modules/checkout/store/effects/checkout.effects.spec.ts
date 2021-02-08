import { Action, Store } from '@ngrx/store';
import { ComponentFixture } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';

import { CheckoutActions } from '../actions';
import { CheckoutEffects } from './checkout.effects';
import { DummyTestComponent } from '../../../../../../__mocks__/DummyComponent';
import Vehicle from '../../../home/store/models/vehicle';

const vehicle: Vehicle = {
  id: '95ef282b-4378-4447-bfe6-bc362184ca66',
  make: 'Ford',
  model: 'Eco Sport SE',
  year: 2020,
  hourlyValue: 20.0,
  fuel: ['gasolina", "álcool'],
  trunkCapacity: '350 litro',
  category: 'completo'
};

describe('CheckoutEffects', () => {
  let actions$: Observable<Action>;
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let effects: CheckoutEffects;
  let store: MockStore;

  const initialState = {
    checkout: {
      rental: {
        vehicleId: '',
        hourlyValue: 0,
        hours: 0,
        value: 0
      }
    }
  };

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      providers: [
        CheckoutEffects,
        provideMockStore({
          initialState
        }),
        provideMockActions(() => actions$),
      ],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
    effects = component.injector.get(CheckoutEffects);
    store = component.injector.get(MockStore);
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('ao selecionar um veículo e não houver nenhum selecionado o mesmo deve ser selecionado', (done) => {
    actions$ = of(CheckoutActions.changeVehicle({ vehicle }));

    effects.changeVehicle$.subscribe((result) => {
      expect(result).toMatchObject(CheckoutActions.confirmChangeVehicle());
      done();
    });
  });

  it('ao selecionar um veículo e houver algum selecionado o sistema deve questionar se é para trocar', (done) => {
    store.setState({
      checkout: {
        rental: {
          vehicleId: '81689e57-a7d8-4187-b3ba-be2f77277d0e',
          hourlyValue: 10.0,
          hours: 1,
          value: 10.0
        }
      }
    });

    actions$ = of(CheckoutActions.changeVehicle({ vehicle }));

    effects.changeVehicle$.subscribe((result) => {
      expect(result).toMatchObject(CheckoutActions.askChangeVehicle());
      done();
    });
  });
});
