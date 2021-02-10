import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutEffects } from './modules/checkout/store/effects/checkout.effects';
import { CheckoutReducer } from './modules/checkout/store/reducers';
import { NavigationEffects } from './store/effects/navigation.effects';
import { VehicleEffects } from './modules/home/store/effects/vehicle.effects';
import { VehicleReducer } from './modules/home/store/reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    EffectsModule.forRoot([NavigationEffects, VehicleEffects, CheckoutEffects]),
    HttpClientModule,
    StoreModule.forRoot({
      vehicle: VehicleReducer.reducer,
      checkout: CheckoutReducer.reducer,
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
