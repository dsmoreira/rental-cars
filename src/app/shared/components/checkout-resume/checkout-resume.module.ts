import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CheckoutResumeComponent } from './checkout-resume.component';

@NgModule({
  declarations: [CheckoutResumeComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [CheckoutResumeComponent],
})
export class CheckoutResumeModule {}
