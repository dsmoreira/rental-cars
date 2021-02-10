import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VehicleActionsModule } from '../vehicle-actions/vehicle-actions.module';
import { VehicleCardComponent } from './vehicle-card.component';
import { VehicleDetailModule } from '../vehicle-detail/vehicle-detail.module';

@NgModule({
  declarations: [VehicleCardComponent],
  imports: [CommonModule, VehicleActionsModule, VehicleDetailModule],
  exports: [VehicleCardComponent],
})
export class VehicleCardModule {}
