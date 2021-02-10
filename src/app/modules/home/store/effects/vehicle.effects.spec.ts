import { Action } from '@ngrx/store';
import { ComponentFixture } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';

import { DummyTestComponent } from '../../../../../../__mocks__/DummyComponent';
import { NavigationActions } from '../../../../store/actions/index';
import { NotificationService } from '../../../../core/services/notification.service';
import { vehicles } from '../../../../../../__mocks__/DbMock';
import { VehicleEffects } from './vehicle.effects';
import { VehicleActions } from '../actions';
import { VehicleService } from '../../services/vehicle.service';

describe('VehicleEffects', () => {
  let actions$: Observable<Action>;
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let effects: VehicleEffects;
  let availableVehiclesMock = of(vehicles);
  let notificationService: NotificationService;

  let notificationServiceSpy: jest.SpyInstance;

  const vehicleServiceMock: any = {
    availableVehicles: jest.fn(() => availableVehiclesMock),
  };

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      providers: [
        VehicleEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: VehicleService,
          useValue: vehicleServiceMock,
        },
      ],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;

    effects = component.injector.get(VehicleEffects);
    notificationService = component.injector.get(NotificationService);

    notificationServiceSpy = jest.spyOn(notificationService, 'notifyError');
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('ao navegar para a home os veículos devem ser carregados', (done) => {
    actions$ = of(
      NavigationActions.navigationPerfomed({
        params: {},
        queryParams: {},
        data: {},
        path: '',
      })
    );

    effects.homeNavigate$.subscribe((result) => {
      expect(result).toMatchObject(VehicleActions.getVehicles());
      done();
    });
  });

  it('ao obter os veículos com sucesso a ação de sucesso deve ser chamada passando a lista de veículos', (done) => {
    actions$ = of(VehicleActions.getVehicles());

    effects.getVehicles$.subscribe((action) => {
      expect(action).toMatchObject(
        VehicleActions.getVehiclesSuccess({ vehicles })
      );
      done();
    });
  });

  it('ao obter os veículos com erro a ação de erro deve ser chamada e nenhum resultado retornado', (done) => {
    availableVehiclesMock = throwError('Opss!!');

    actions$ = of(VehicleActions.getVehicles());

    effects.getVehicles$.subscribe((result) => {
      expect(result).toMatchObject(
        VehicleActions.getVehiclesError({
          error: { message: 'Opss!!' },
        })
      );
      done();
    });
  });

  it('ao ocorrer erro na busca de veiculos o serviço de notificação deve notificar um erro', (done) => {
    const error = { message: 'Opss!!' };

    actions$ = of(VehicleActions.getVehiclesError({ error }));

    effects.getVehiclesError$.subscribe((result) => {
      expect(notificationServiceSpy).toHaveBeenCalledWith(error);
      done();
    });
  });
});
