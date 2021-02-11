import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckoutComponent } from './checkout.component';
import { HeaderModule } from '../../core/layout/header/header.module';
import { VehicleActionsModule } from '../../shared/components/vehicle-actions/vehicle-actions.module';
import { VehicleDetailModule } from '../../shared/components/vehicle-detail/vehicle-detail.module';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { LoginDetailModule } from '../../shared/components/login-detail/login-detail.module';
import { CheckoutState } from './store/reducers/checkout.reducer';
import { vehicles } from '../../../../__mocks__/DbMock';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import moment from 'moment';

const vehicle = vehicles[0];

const state: CheckoutState = {
  rental: {
    hours: 2,
    value: 20,
    vehicle,
  },
  nextRental: null,
  loading: false,
};

const initialState = {
  checkout: state,
};

describe('CheckoutComponent', () => {
  let renderResult: RenderResult<CheckoutComponent>;
  let fixture: ComponentFixture<CheckoutComponent>;
  let component: CheckoutComponent;
  let mockStore: MockStore;
  let storeDispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    renderResult = await render(CheckoutComponent, {
      imports: [
        BrowserModule,
        FormsModule,
        HeaderModule,
        LoadingModule,
        LoginDetailModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatMomentDateModule,
        ReactiveFormsModule,
        RouterTestingModule,
        VehicleActionsModule,
        VehicleDetailModule,
      ],
      providers: [provideMockStore({ initialState })],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
    mockStore = fixture.debugElement.injector.get(MockStore);

    storeDispatchSpy = jest.spyOn(mockStore, 'dispatch');
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('somente deve ser chamado o evento de salvar caso a data esteja preenchida', () => {
    storeDispatchSpy.mockReset();

    component.checkout(state.rental);

    component.rentalDate.setValue(moment());

    component.checkout(state.rental);

    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
  });
});
