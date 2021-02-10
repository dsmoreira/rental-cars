import { Component, Input, OnInit } from '@angular/core';

import { Vehicle } from '../../../modules/home/store/models/vehicle';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss'],
})
export class VehicleDetailComponent implements OnInit {
  @Input() vehicle: Vehicle | undefined;

  constructor() {}

  ngOnInit(): void {}
}
