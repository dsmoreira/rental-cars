import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';

import { DummyTestComponent } from '../../../../__mocks__/DummyComponent';
import { ConfirmDialogService } from './confirm-dialog.service';

describe('ConfirmDialogService', () => {
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let service: ConfirmDialogService;

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent);
    fixture = renderResult.fixture;
    component = fixture.componentInstance;

    service = component.injector.get(ConfirmDialogService);
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
