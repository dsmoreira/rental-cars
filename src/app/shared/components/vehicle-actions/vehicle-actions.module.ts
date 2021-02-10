import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { VehicleActionsComponent } from './vehicle-actions.component';

@NgModule({
  declarations: [VehicleActionsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [VehicleActionsComponent],
})
export class VehicleActionsModule {}
