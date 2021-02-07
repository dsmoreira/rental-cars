import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [CheckoutRoutingModule, CommonModule],
})
export class CheckoutModule {}
