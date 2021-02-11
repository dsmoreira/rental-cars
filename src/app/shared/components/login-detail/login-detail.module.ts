import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { LoginDetailComponent } from './login-detail.component';

@NgModule({
  declarations: [LoginDetailComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [LoginDetailComponent],
})
export class LoginDetailModule {}
