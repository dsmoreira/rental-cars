import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { LogoModule } from '../../../shared/components/logo/logo.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, LogoModule, MatToolbarModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
