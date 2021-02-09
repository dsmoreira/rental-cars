import { Injectable } from '@angular/core';

import { AppError } from '../models/app-error';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor() {}

  notifyError(error: AppError): void {
    console.log(error);
  }
}
