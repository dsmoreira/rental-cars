import { Action, Store } from '@ngrx/store';
import { ComponentFixture } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';

import { CheckoutActions } from '../actions';
import { CheckoutEffects } from './checkout.effects';
import { CheckoutService } from '../../services/checkout.service';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { DummyTestComponent } from '../../../../../../__mocks__/DummyComponent';
import { NavigationActions } from '../../../../store/actions';
import { NotificationService } from '../../../../core/services/notification.service';
import { Rental } from '../../../checkout/store/models/rental';
import { Vehicle } from '../../../home/store/models/vehicle';
import { vehicles } from '../../../../../../__mocks__/DbMock';

const vehicle: Vehicle = vehicles[0];
const diffVehicle: Vehicle = vehicles[1];

const initialState = {
  checkout: {
    rental: {
      vehicle: undefined,
      hourlyValue: 0,
      hours: 0,
      value: 0,
      date: undefined,
    },
  },
  auth: {
    token: '',
    name: '',
    userId: '',
  },
};

const rental: Rental = {
  vehicle,
  hours: 5,
  value: 5 * vehicle.hourlyValue,
  date: new Date(Date.now()),
};

describe('CheckoutEffects', () => {
  let actions$: Observable<Action>;
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let effects: CheckoutEffects;
  let store: MockStore;
  let notificationService: NotificationService;

  let notificationServiceSpy: jest.SpyInstance;

  let confirmChangeMock = of(true);

  const confirmDialogServiceMock = {
    confirm: jest.fn(() => confirmChangeMock),
  };

  let saveCheckoutMock = of(true);

  const checkoutServiceMock = {
    save: jest.fn(() => saveCheckoutMock),
  };

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      providers: [
        CheckoutEffects,
        provideMockStore({
          initialState,
        }),
        provideMockActions(() => actions$),
        {
          provide: ConfirmDialogService,
          useValue: confirmDialogServiceMock,
        },
        {
          provide: CheckoutService,
          useValue: checkoutServiceMock,
        },
      ],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
    effects = component.injector.get(CheckoutEffects);
    store = component.injector.get(MockStore);
    notificationService = component.injector.get(NotificationService);

    notificationServiceSpy = jest.spyOn(notificationService, 'notifyError');
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
      ...initialState,
      checkout: {
        rental: {
          vehicle: diffVehicle,
          hours: 1,
          value: diffVehicle.hourlyValue,
          date: new Date(Date.now()),
        },
      },
    });

    actions$ = of(CheckoutActions.changeVehicle({ vehicle }));

    effects.changeVehicle$.subscribe((result) => {
      expect(result).toMatchObject(CheckoutActions.askChangeVehicle());
      done();
    });
  });

  it('ao questinar a troca de veículo, o serviço de confirmação deve ser chamado', (done) => {
    actions$ = of(CheckoutActions.askChangeVehicle());

    effects.askChangeVehicle$.subscribe((result) => {
      expect(confirmDialogServiceMock.confirm).toBeCalled();
      done();
    });
  });

  it('após ser questinado sobre a troca de veículo, ao confirmar, a ação de confirmação deve ser chamada', (done) => {
    confirmChangeMock = of(true);

    actions$ = of(CheckoutActions.askChangeVehicle());

    effects.askChangeVehicle$.subscribe((result) => {
      expect(result).toMatchObject(CheckoutActions.confirmChangeVehicle());
      done();
    });
  });

  it('após ser questinado sobre a troca de veículo, ao rejeitar, a ação de rejeição deve ser chamada', (done) => {
    confirmChangeMock = of(false);

    actions$ = of(CheckoutActions.askChangeVehicle());

    effects.askChangeVehicle$.subscribe((result) => {
      expect(result).toMatchObject(CheckoutActions.rejectChangeVehicle());
      done();
    });
  });

  it('ao tentar reduzir as horas e a quantidade de horas for maior do que 1 o sistema deve confirmar a redução de horas', (done) => {
    store.setState({
      ...initialState,
      checkout: {
        rental: {
          vehicle: diffVehicle,
          hours: 2,
          value: diffVehicle.hourlyValue * 2,
          date: new Date(Date.now()),
        },
      },
    });

    actions$ = of(CheckoutActions.decreaseHours());

    effects.decreaseHours$.subscribe((result) => {
      expect(result).toMatchObject(CheckoutActions.confirmDecreaseHours());
      done();
    });
  });

  it('ao tentar reduzir as horas e a quantidade de horas for igual 1 o sistema deve questionar a remoção do veículo', (done) => {
    store.setState({
      ...initialState,
      checkout: {
        rental: {
          vehicle: diffVehicle,
          hours: 1,
          value: diffVehicle.hourlyValue,
          date: new Date(Date.now()),
        },
      },
    });

    actions$ = of(CheckoutActions.decreaseHours());

    effects.decreaseHours$.subscribe((result) => {
      expect(result).toMatchObject(CheckoutActions.askRemoveVehicle());
      done();
    });
  });

  it('ao questinar a remoção do veículo, o serviço de confirmação deve ser chamado', (done) => {
    actions$ = of(CheckoutActions.askRemoveVehicle());

    effects.askRemoveVehicle$.subscribe((result) => {
      expect(confirmDialogServiceMock.confirm).toBeCalled();
      done();
    });
  });

  it('após ser questinado sobre a remoção do veículo, ao confirmar, a ação de confirmação deve ser chamada', (done) => {
    confirmChangeMock = of(true);

    actions$ = of(CheckoutActions.askRemoveVehicle());

    effects.askRemoveVehicle$.subscribe((result) => {
      expect(result).toMatchObject(CheckoutActions.confirmRemoveVehicle());
      done();
    });
  });

  it('após ser questinado sobre a remoção do veículo, ao rejeitar, a ação de rejeição deve ser chamada', (done) => {
    confirmChangeMock = of(false);

    actions$ = of(CheckoutActions.askRemoveVehicle());

    effects.askRemoveVehicle$.subscribe((result) => {
      expect(result).toMatchObject(CheckoutActions.rejectRemoveVehicle());
      done();
    });
  });

  it('ao salvar a aluguel e não estiver logado deve ser direcionado para a tela de login', (done) => {
    store.setState({
      ...initialState,
      auth: {
        token: '',
        name: '',
      },
    });

    actions$ = of(CheckoutActions.saveRental({ rental }));

    effects.saveRental$.subscribe((result) => {
      expect(result).toMatchObject(
        NavigationActions.navigationGo({ payload: { path: ['/auth'] } })
      );
      done();
    });
  });

  it('ao salvar a aluguel e estiver logado deve chamar o serviço para salvar o alguel', (done) => {
    store.setState({
      ...initialState,
      auth: {
        token: 'token_teste',
        name: 'Daniel Silva Moreira',
      },
    });

    actions$ = of(CheckoutActions.saveRental({ rental }));

    effects.saveRental$.subscribe((result) => {
      expect(checkoutServiceMock.save).toBeCalled();
      done();
    });
  });

  it('ao salvar o aluguel com sucesso', (done) => {
    store.setState({
      ...initialState,
      auth: {
        token: 'token_teste',
        name: 'Daniel Silva Moreira',
      },
    });

    saveCheckoutMock = of(true);

    actions$ = of(CheckoutActions.saveRental({ rental }));

    effects.saveRental$.subscribe((result) => {
      expect(result).toMatchObject(CheckoutActions.saveRentalSuccess());
      done();
    });
  });

  it('ao salvar o aluguel e ocorrer algum erro', (done) => {
    store.setState({
      ...initialState,
      auth: {
        token: 'token_teste',
        name: 'Daniel Silva Moreira',
      },
    });

    saveCheckoutMock = throwError('Opss!!');

    actions$ = of(CheckoutActions.saveRental({ rental }));

    effects.saveRental$.subscribe((result) => {
      expect(result).toMatchObject(
        CheckoutActions.saveRentalError({ error: { message: 'Opss!!' } })
      );
      done();
    });
  });

  it('ao salvar o alguel com sucesso deve ser direcionado para a rota de listagem de reservas', (done) => {
    actions$ = of(CheckoutActions.saveRentalSuccess());

    effects.saveRentalSuccess$.subscribe((result) => {
      expect(result).toMatchObject(
        NavigationActions.navigationGo({ payload: { path: ['/books'] } })
      );
      done();
    });
  });

  it('ao ocorrer erro ao salvar o aluguel o serviço de notificação de erro deve ser chamado', (done) => {
    const error = { message: 'Opss!!' };

    actions$ = of(CheckoutActions.saveRentalError({ error }));

    effects.saveRentalError$.subscribe((result) => {
      expect(notificationServiceSpy).toHaveBeenCalledWith(error);
      done();
    });
  });
});
