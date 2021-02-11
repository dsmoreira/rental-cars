import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NgxMaskModule } from 'ngx-mask';
import { render, RenderResult } from '@testing-library/angular';

import { AuthState } from '../../store/reducers/auth.reducer';
import { SignupComponent } from './signup.component';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { LogoModule } from '../../shared/components/logo/logo.module';
import { SignupRoutingModule } from './signup-routing.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';

const state: AuthState = {
  name: '',
  token: '',
  userId: '',
  loading: false,
};

const initialState = {
  auth: state,
};

describe('SignupComponent', () => {
  let renderResult: RenderResult<SignupComponent>;
  let fixture: ComponentFixture<SignupComponent>;
  let store: MockStore;

  beforeEach(async () => {
    renderResult = await render(SignupComponent, {
      imports: [
        CommonModule,
        FormsModule,
        LoadingModule,
        LogoModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NgxMaskModule.forRoot(),
        MatMomentDateModule,
        ReactiveFormsModule,
        SignupRoutingModule,
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
});
