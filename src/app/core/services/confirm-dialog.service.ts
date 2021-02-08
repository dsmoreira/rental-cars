import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  constructor() {}

  confirm(text: string): Observable<boolean> {
    return of(true);
  }
}
