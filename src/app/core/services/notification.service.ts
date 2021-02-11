import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { mergeMap } from 'rxjs/operators';

import { AppError } from '../models/app-error';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private notifierService: NotifierService) {}

  notifyError(error: AppError): void {
    this.notifierService.notify('error', error.message);
  }

  notifySucess(message: string): void {
    this.notifierService.notify('success', message);
  }
}
