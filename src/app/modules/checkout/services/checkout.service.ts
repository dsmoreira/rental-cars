import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Book } from '../../book/store/models/book';
import { Rental } from '../store/models/rental';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private apiUrl = environment.apiUrl;

  constructor(public httpCliente: HttpClient) {}

  save(rental: Rental): Observable<any> {
    const book: Book = {
      vehicleId: rental.vehicle?.id as string,
      hours: rental.hours,
      date: rental.date?.toDateString() as string,
      value: rental.value,
      id: this.createGuid(),
      licensePlate: this.createLicensePlate(),
    };
    return this.httpCliente.post<any>(`${this.apiUrl}/books`, book);
  }

  private createGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c): string => {
        /* tslint:disable:no-bitwise */
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        /* tslint:enable:no-bitwise */
        return v.toString(16);
      }
    );
  }

  private createLicensePlate(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    return 'xxxxnnnn'.replace(/[xn]/g, (c) =>
      c === 'x' ? chars[Math.random() % 26] : numbers[Math.random() % 10]
    );
  }
}
