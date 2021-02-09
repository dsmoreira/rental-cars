import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Rental } from '../store/models/rental';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private apiUrl = environment.apiUrl;

  constructor(public httpCliente: HttpClient) {}

  save(rental: Rental): Observable<any> {
    return this.httpCliente.post<any>(`${this.apiUrl}/book`, rental);
  }
}
