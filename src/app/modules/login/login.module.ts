import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';

import { LoadingModule } from '../../shared/components/loading/loading.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LogoModule } from '../../shared/components/logo/logo.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    LoginRoutingModule,
    LogoModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
