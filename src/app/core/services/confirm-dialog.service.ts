import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../layout/confirm-dialog/confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  constructor(public dialog: MatDialog) {}

  confirm(text: string): Observable<boolean> {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirmar', message: text },
    });

    return dialog.afterClosed();
  }
}
