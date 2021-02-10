import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { CheckoutActions } from '../../../modules/checkout/store/actions';
import { Rental } from '../../../modules/checkout/store/models/rental';
import { selectRental } from '../../../modules/checkout/store/selectors/checkout.selector';
import { Vehicle } from '../../../modules/home/store/models/vehicle';

@Component({
  selector: 'app-vehicle-actions',
  templateUrl: './vehicle-actions.component.html',
  styleUrls: ['./vehicle-actions.component.scss'],
})
export class VehicleActionsComponent {
  @Input() vehicle: Vehicle | undefined;

  rental$: Observable<Rental>;

  constructor(private store: Store) {
    this.rental$ = this.store.select(selectRental);
  }

  selectVehicle(): void {
    this.store.dispatch(
      CheckoutActions.changeVehicle({ vehicle: this.vehicle as Vehicle })
    );
  }

  increaseHours(): void {
    this.store.dispatch(CheckoutActions.increaseHours());
  }

  decreaseHours(): void {
    this.store.dispatch(CheckoutActions.decreaseHours());
  }
}
