import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
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
    HeaderModule,
    LoginDetailModule,
    MatButtonModule,
    VehicleActionsModule,
    VehicleDetailModule,
  ],
})
export class CheckoutModule {}
