import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import Vehicle from '../store/models/vehicle';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public availableVehicles(): Observable<Array<Vehicle>> {
    return this.http.get<Array<Vehicle>>(`${this.apiUrl}/vehicles`);
  }
}
