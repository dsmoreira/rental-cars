import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { render, RenderResult } from '@testing-library/angular';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let renderResult: RenderResult<LoadingComponent>;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    renderResult = await render(LoadingComponent, {
      imports: [BrowserModule, MatProgressSpinnerModule],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
