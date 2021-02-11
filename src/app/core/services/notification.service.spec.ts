import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { NotifierModule } from 'angular-notifier';

import { DummyTestComponent } from '../../../../__mocks__/DummyComponent';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let service: NotificationService;

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      imports: [NotifierModule],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;

    service = component.injector.get(NotificationService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
