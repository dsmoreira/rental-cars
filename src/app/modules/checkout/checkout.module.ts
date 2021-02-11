import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { HeaderModule } from '../../core/layout/header/header.module';
import { VehicleDetailModule } from '../../shared/components/vehicle-detail/vehicle-detail.module';
import { VehicleActionsModule } from '../../shared/components/vehicle-actions/vehicle-actions.module';
import { LoginDetailModule } from '../../shared/components/login-detail/login-detail.module';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CheckoutRoutingModule,
    CommonModule,
    FormsModule,
    HeaderModule,
    LoginDetailModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    VehicleActionsModule,
    VehicleDetailModule,
  ],
})
export class CheckoutModule {}
