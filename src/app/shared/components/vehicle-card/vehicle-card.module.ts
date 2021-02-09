import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VehicleCardComponent } from './vehicle-card.component';

@NgModule({
  declarations: [VehicleCardComponent],
  imports: [CommonModule],
  exports: [VehicleCardComponent],
})
export class VehicleCardModule {}
