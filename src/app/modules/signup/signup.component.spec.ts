import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';

import { AuthState } from '../../store/reducers/auth.reducer';
import { SignupComponent } from './signup.component';

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
      imports: [BrowserModule, CommonModule],
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
