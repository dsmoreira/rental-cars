import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';

import { VehicleCardComponent } from './vehicle-card.component';

describe('VehicleCardComponent', () => {
  let renderResult: RenderResult<VehicleCardComponent>;
  let fixture: ComponentFixture<VehicleCardComponent>;

  beforeEach(async () => {
    renderResult = await render(VehicleCardComponent, {
      imports: [BrowserModule],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
