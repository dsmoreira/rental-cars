import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutResumeModule } from '../../shared/components/checkout-resume/checkout-resume.module';
import { HeaderModule } from '../../core/layout/header/header.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { VehicleCardModule } from '../../shared/components/vehicle-card/vehicle-card.module';
import { LoginDetailModule } from '../../shared/components/login-detail/login-detail.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CheckoutResumeModule,
    CommonModule,
    HeaderModule,
    HomeRoutingModule,
    LoadingModule,
    LoginDetailModule,
    VehicleCardModule,
  ],
})
export class HomeModule {}
