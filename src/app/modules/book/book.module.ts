import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { BookComponent } from './book.component';
import { BookRoutingModule } from './book-routing.module';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { HeaderModule } from '../../core/layout/header/header.module';
import { CheckoutResumeModule } from 'src/app/shared/components/checkout-resume/checkout-resume.module';
import { LoginDetailModule } from '../../shared/components/login-detail/login-detail.module';

@NgModule({
  declarations: [BookComponent],
  imports: [
    BookRoutingModule,
    CheckoutResumeModule,
    CommonModule,
    HeaderModule,
    LoadingModule,
    LoginDetailModule,
    MatButtonModule,
  ],
})
export class BookModule {}
