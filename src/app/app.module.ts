import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { NotifierModule } from 'angular-notifier';
import { StoreModule } from '@ngrx/store';

import { AuthEffects } from './store/effects/auth.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthReducer } from './store/reducers';
import { BookEffects } from './modules/book/store/effects/book.effects';
import { BookReducer } from './modules/book/store/reducers';
import { CheckoutEffects } from './modules/checkout/store/effects/checkout.effects';
import { CheckoutReducer } from './modules/checkout/store/reducers';
import { metaReducers } from './store/reducers/storage.metareducer';
import { NavigationEffects } from './store/effects/navigation.effects';
import { VehicleEffects } from './modules/home/store/effects/vehicle.effects';
import { VehicleReducer } from './modules/home/store/reducers';
import { ConfirmDialogModule } from './core/layout/confirm-dialog/confirm-dialog.module';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ConfirmDialogModule,
    EffectsModule.forRoot([
      AuthEffects,
      BookEffects,
      CheckoutEffects,
      NavigationEffects,
      VehicleEffects,
    ]),
    HttpClientModule,
    MatMomentDateModule,
    NotifierModule,
    StoreModule.forRoot(
      {
        auth: AuthReducer.reducer,
        book: BookReducer.reducer,
        checkout: CheckoutReducer.reducer,
        vehicle: VehicleReducer.reducer,
      },
      {
        metaReducers,
      }
    ),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
