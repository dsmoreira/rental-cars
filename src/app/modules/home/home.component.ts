import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  selectLoading,
  selectBasicVehicles,
  selectCompleteVehicles,
  selectLuxVehicles,
} from './store/selectors/vehicle.selector';
import { Vehicle } from './store/models/vehicle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loading$: Observable<boolean>;
  basicVehicles$: Observable<Vehicle[]>;
  completeVehicles$: Observable<Vehicle[]>;
  luxVehicles$: Observable<Vehicle[]>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectLoading);
    this.basicVehicles$ = this.store.select(selectBasicVehicles);
    this.completeVehicles$ = this.store.select(selectCompleteVehicles);
    this.luxVehicles$ = this.store.select(selectLuxVehicles);
  }
}
