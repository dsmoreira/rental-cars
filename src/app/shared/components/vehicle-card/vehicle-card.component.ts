import { Component, Input, OnInit } from '@angular/core';

import { Vehicle } from '../../../modules/home/store/models/vehicle';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
})
export class VehicleCardComponent implements OnInit {
  @Input() vehicle: Vehicle | undefined;

  constructor() {}

  ngOnInit(): void {}
}
