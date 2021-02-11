import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { LogoModule } from '../../shared/components/logo/logo.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    LogoModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    SignupRoutingModule,
  ],
  providers: [MatDatepickerModule],
})
export class SignupModule {}
