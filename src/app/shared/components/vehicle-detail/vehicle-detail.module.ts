import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDetailComponent } from './vehicle-detail.component';

@NgModule({
  declarations: [VehicleDetailComponent],
  imports: [CommonModule],
  exports: [VehicleDetailComponent],
})
export class VehicleDetailModule {}
