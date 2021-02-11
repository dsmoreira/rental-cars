import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { ConfirmDialogComponent } from '../layout/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog.service';

const mockDialogResponse = of(true);

const mockDialog = {
  open: () => {
    return {
      afterClosed: () => mockDialogResponse,
    };
  },
};

describe('ConfirmDialogService', () => {
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let service: ConfirmDialogService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatDialogModule],
      declarations: [ConfirmDialogComponent],
      providers: [
        ConfirmDialogService,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MatDialog,
          useValue: mockDialog,
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [ConfirmDialogComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    fixture.detectChanges();
    service = TestBed.inject(ConfirmDialogService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve confirmar através de observable', (done) => {
    service.confirm('Confirmado?').subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });
});
