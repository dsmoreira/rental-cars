import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';

import { DummyTestComponent } from '../../../../__mocks__/DummyComponent';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthGuard } from './auth.guard';
import { AuthState } from '../../store/reducers/auth.reducer';

const state: AuthState = {
  name: '',
  token: '',
  userId: '',
  loading: false,
};

const initialState = {
  auth: state,
};

describe('AuthService', () => {
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let guard: AuthGuard;
  let storeMock: MockStore;
  let storeDispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      imports: [],
      providers: [provideMockStore({ initialState })],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;

    guard = component.injector.get(AuthGuard);
    storeMock = component.injector.get(MockStore);
    storeDispatchSpy = jest.spyOn(storeMock, 'dispatch');
  });

  it('deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  it('caso o usuário não esteja locado deve disparar uma ação para direcionar o usuário para o login', (done) => {
    guard.canActivate().subscribe((result) => {
      expect(storeDispatchSpy).toHaveBeenCalled();
      expect(result).toBeFalsy();
      done();
    });
  });

  it('caso o usuário esteja locado deve retornar verdadeiro no resultado e não deve direcionar o usuário', (done) => {
    storeDispatchSpy.mockReset();

    storeMock.setState({
      auth: {
        name: 'teste',
        token: 'teste',
        userId: 'teste',
      },
    });

    guard.canActivate().subscribe((result) => {
      expect(storeDispatchSpy).toHaveBeenCalledTimes(0);
      expect(result).toBeTruthy();
      done();
    });
  });
});
