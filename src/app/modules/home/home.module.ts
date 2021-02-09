import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '../../core/layout/header/header.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { VehicleCardModule } from '../../shared/components/vehicle-card/vehicle-card.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HeaderModule,
    HomeRoutingModule,
    LoadingModule,
    VehicleCardModule,
  ],
})
export class HomeModule {}
