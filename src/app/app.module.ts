import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationEffects } from './store/effects/navigation.effects';
import { VehicleEffects } from './modules/home/store/effects/vehicle.effects';
import { VehicleReducer } from './modules/home/store/reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    EffectsModule.forRoot([NavigationEffects, VehicleEffects]),
    HttpClientModule,
    StoreModule.forRoot({ vehicle: VehicleReducer.reducer }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
