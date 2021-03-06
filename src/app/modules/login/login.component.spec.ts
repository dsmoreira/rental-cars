import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgxMaskModule } from 'ngx-mask';
import { render, RenderResult } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthState } from '../../store/reducers/auth.reducer';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LogoModule } from '../../shared/components/logo/logo.module';

const state: AuthState = {
  name: '',
  token: '',
  userId: '',
  loading: false,
};

const initialState = {
  auth: state,
};

describe('LoginComponent', () => {
  let renderResult: RenderResult<LoginComponent>;
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let store: MockStore;

  let storeSpy: jest.SpyInstance;

  beforeEach(async () => {
    renderResult = await render(LoginComponent, {
      imports: [
        CommonModule,
        FormsModule,
        LoadingModule,
        LoginRoutingModule,
        LogoModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NgxMaskModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule,
      ],
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

  it('somente deverá ser feito login se os campos forem válidos', () => {
    component.login();

    expect(storeSpy).toHaveBeenCalledTimes(0);

    component.username.setValue('78296364000');
    component.password.setValue('a1s2d3');

    component.login();

    expect(storeSpy).toHaveBeenCalledTimes(1);
  });
});
