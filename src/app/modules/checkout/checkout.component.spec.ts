import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckoutComponent } from './checkout.component';
import { HeaderModule } from '../../core/layout/header/header.module';
import { VehicleActionsModule } from '../../shared/components/vehicle-actions/vehicle-actions.module';
import { VehicleDetailModule } from '../../shared/components/vehicle-detail/vehicle-detail.module';
import { LoginDetailModule } from '../../shared/components/login-detail/login-detail.module';

describe('CheckoutComponent', () => {
  let renderResult: RenderResult<CheckoutComponent>;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    renderResult = await render(CheckoutComponent, {
      imports: [
        BrowserModule,
        HeaderModule,
        LoginDetailModule,
        MatButtonModule,
        RouterTestingModule,
        VehicleActionsModule,
        VehicleDetailModule,
      ],
      providers: [provideMockStore({})],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
