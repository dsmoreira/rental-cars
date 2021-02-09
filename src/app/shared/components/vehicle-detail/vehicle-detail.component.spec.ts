import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';

import { VehicleDetailComponent } from './vehicle-detail.component';

describe('VehicleDetailComponent', () => {
  let renderResult: RenderResult<VehicleDetailComponent>;
  let fixture: ComponentFixture<VehicleDetailComponent>;

  beforeEach(async () => {
    renderResult = await render(VehicleDetailComponent, {
      imports: [BrowserModule],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
