import { Action } from '@ngrx/store';
import { ComponentFixture } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';

import { AuthActions, NavigationActions } from '../actions';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../../core/services/auth.service';
import { DummyTestComponent } from '../../../../__mocks__/DummyComponent';
import { LoginInfo } from '../models/login-info';
import { LoginResult } from '../models/login-result';
import { NotificationService } from '../../core/services/notification.service';
import { User } from '../models/user';

const loginInfo: LoginInfo = {
  userName: '78296364000',
  password: 'a1s2d3A!S@D#',
};

const loginResult: LoginResult = {
  id: '8d57964d-7fb5-4b6d-b4c9-f0a9e3fe4e15',
  name: 'Daniel Silva Moreira',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
};

const user: User = {
  document: '78296364000',
  name: 'Daniel Silva Moreira',
  birthdate: '1989-03-03',
  zipcode: '30000-000',
  street: 'Av do Contorno',
  number: 1500,
  complement: 'Sala 1220',
  city: 'Belo Horizonte',
  state: 'MG',
};

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let effects: AuthEffects;
  let notificationService: NotificationService;

  let notificationServiceSpy: jest.SpyInstance;

  let loginMock = of(loginResult);
  let signupMock = of(user);

  const authServiceMock = {
    login: jest.fn(() => loginMock),
    signup: jest.fn(() => signupMock),
  };

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      providers: [
        AuthEffects,
        provideMockStore({}),
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
    effects = component.injector.get(AuthEffects);

    notificationService = component.injector.get(NotificationService);

    notificationServiceSpy = jest.spyOn(notificationService, 'notifyError');
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('ao tentar efetuar login o sistema deve chamar o serviço de autenticação para efetuar login', (done) => {
    actions$ = of(AuthActions.login({ loginInfo }));

    effects.login$.subscribe((result) => {
      expect(authServiceMock.login).toBeCalled();
      done();
    });
  });

  it('ao efetuar login com sucesso', (done) => {
    loginMock = of(loginResult);

    actions$ = of(AuthActions.login({ loginInfo }));

    effects.login$.subscribe((result) => {
      expect(result).toMatchObject(AuthActions.loginSuccess({ loginResult }));
      done();
    });
  });

  it('ao efetuar login e ocorrer algum erro', (done) => {
    loginMock = throwError('Usuário ou senha inválidos!');

    actions$ = of(AuthActions.login({ loginInfo }));

    effects.login$.subscribe((result) => {
      expect(result).toMatchObject(
        AuthActions.loginError({
          error: { message: 'Usuário ou senha inválidos!' },
        })
      );
      done();
    });
  });

  it('ao efetuar login com sucesso deve ser direcionado para a rota de listagem de reservas', (done) => {
    actions$ = of(AuthActions.loginSuccess({ loginResult }));

    effects.loginSuccess$.subscribe((result) => {
      expect(result).toMatchObject(
        NavigationActions.navigationGo({ path: ['/books'] })
      );
      done();
    });
  });

  it('ao ocorrer erro ao efetuar login o serviço de notificação de erro deve ser chamado', (done) => {
    const error = { message: 'Usuário ou senha inválidos!' };

    actions$ = of(AuthActions.loginError({ error }));

    effects.loginError$.subscribe((result) => {
      expect(notificationServiceSpy).toHaveBeenCalledWith(error);
      done();
    });
  });

  it('ao tentar salvar o usuário o sistema deve chamar o serviço de autenticação para cadastrar o usuário', (done) => {
    actions$ = of(AuthActions.signup({ user }));

    effects.signup$.subscribe((result) => {
      expect(authServiceMock.signup).toBeCalled();
      done();
    });
  });

  it('ao cadastro o usuário com sucesso com sucesso deve disparar a ação de sucesso', (done) => {
    signupMock = of(user);

    actions$ = of(AuthActions.signup({ user }));

    effects.signup$.subscribe((result) => {
      expect(result).toMatchObject(AuthActions.signupSuccess());
      done();
    });
  });

  it('ao ocorrer algum erro no cadastro do usário deve disparar a ação de erro', (done) => {
    signupMock = throwError('Opss!');

    actions$ = of(AuthActions.signup({ user }));

    effects.signup$.subscribe((result) => {
      expect(result).toMatchObject(
        AuthActions.signupError({
          error: { message: 'Opss!' },
        })
      );
      done();
    });
  });

  it('ao cadastrar o usuário com sucesso deve ser direcionado para a rota de login', (done) => {
    actions$ = of(AuthActions.signupSuccess());

    effects.signupSuccess$.subscribe((result) => {
      expect(result).toMatchObject(
        NavigationActions.navigationGo({ path: ['/login'] })
      );
      done();
    });
  });

  it('ao ocorrer erro no cadastro do usuário o serviço de notificação de erro deve ser chamado', (done) => {
    const error = { message: 'Opss!' };

    actions$ = of(AuthActions.signupError({ error }));

    effects.signupError$.subscribe((result) => {
      expect(notificationServiceSpy).toHaveBeenCalledWith(error);
      done();
    });
  });
});
