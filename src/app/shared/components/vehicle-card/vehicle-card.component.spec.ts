import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';

import { VehicleActionsModule } from '../vehicle-actions/vehicle-actions.module';
import { VehicleCardComponent } from './vehicle-card.component';
import { VehicleDetailModule } from '../vehicle-detail/vehicle-detail.module';

describe('VehicleCardComponent', () => {
  let renderResult: RenderResult<VehicleCardComponent>;
  let fixture: ComponentFixture<VehicleCardComponent>;

  beforeEach(async () => {
    renderResult = await render(VehicleCardComponent, {
      imports: [BrowserModule, VehicleActionsModule, VehicleDetailModule],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
