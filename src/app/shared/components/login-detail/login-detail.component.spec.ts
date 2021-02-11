import { ComponentFixture } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';

import { LoginDetailComponent } from './login-detail.component';

describe('LoginDetailComponent', () => {
  let renderResult: RenderResult<LoginDetailComponent>;
  let fixture: ComponentFixture<LoginDetailComponent>;

  beforeEach(async () => {
    renderResult = await render(LoginDetailComponent, {
      imports: [BrowserModule, MatButtonModule, RouterTestingModule],
      providers: [provideMockStore({})],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
