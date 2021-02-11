import { Action } from '@ngrx/store';
import { ComponentFixture } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';

import { books } from '../../../../../../__mocks__/DbMock';
import { DummyTestComponent } from '../../../../../../__mocks__/DummyComponent';
import { NavigationActions } from '../../../../store/actions/index';
import { NotificationService } from '../../../../core/services/notification.service';
import { BookEffects } from './book.effects';
import { BookActions } from '../actions';
import { BookService } from '../../services/book.service';
import { NotifierModule } from 'angular-notifier';

const initialState = {
  checkout: {
    rental: {
      vehicleId: '',
      hourlyValue: 0,
      hours: 0,
      value: 0,
    },
  },
  auth: {
    token: 'teste_token',
    name: 'Daniel Silva Moreira',
    userId: '10569156-149c-48bb-98d5-b1e112047ff4',
  },
};

describe('BookEffects', () => {
  let actions$: Observable<Action>;
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let effects: BookEffects;
  let notificationService: NotificationService;

  let notificationServiceSpy: jest.SpyInstance;

  let booksMock = of(books);

  const bookServiceMock: any = {
    getBooks: jest.fn(() => booksMock),
  };

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      imports: [NotifierModule],
      providers: [
        BookEffects,
        provideMockStore({
          initialState,
        }),
        provideMockActions(() => actions$),
        {
          provide: BookService,
          useValue: bookServiceMock,
        },
      ],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;

    effects = component.injector.get(BookEffects);
    notificationService = component.injector.get(NotificationService);

    notificationServiceSpy = jest.spyOn(notificationService, 'notifyError');
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('ao navegar para a lista de reservas as reservas devem ser carregadas', (done) => {
    actions$ = of(
      NavigationActions.navigationPerfomed({
        params: {},
        queryParams: {},
        data: {},
        path: '/books',
      })
    );

    effects.booksNavigate$.subscribe((result) => {
      expect(result).toMatchObject(BookActions.getBooks());
      done();
    });
  });

  it('ao obter as reservas com sucesso a ação de sucesso deve ser chamada passando a lista de reservas', (done) => {
    actions$ = of(BookActions.getBooks());

    effects.getBooks$.subscribe((action) => {
      expect(action).toMatchObject(BookActions.getBooksSuccess({ books }));
      done();
    });
  });

  it('ao obter as reservas com erro a ação de erro deve ser chamada e nenhum resultado retornado', (done) => {
    booksMock = throwError('Opss!!');

    actions$ = of(BookActions.getBooks());

    effects.getBooks$.subscribe((result) => {
      expect(result).toMatchObject(
        BookActions.getBooksError({
          error: { message: 'Opss!!' },
        })
      );
      done();
    });
  });

  it('ao ocorrer erro na busca de reservas o serviço de notificação deve notificar um erro', (done) => {
    const error = { message: 'Opss!!' };

    actions$ = of(BookActions.getBooksError({ error }));

    effects.getBooksError$.subscribe((result) => {
      expect(notificationServiceSpy).toHaveBeenCalledWith(error);
      done();
    });
  });
});
