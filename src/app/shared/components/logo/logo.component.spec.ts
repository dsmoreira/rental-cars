import { ComponentFixture } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { render, RenderResult } from '@testing-library/angular';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let renderResult: RenderResult<LogoComponent>;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    renderResult = await render(LogoComponent, {
      imports: [BrowserModule],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
