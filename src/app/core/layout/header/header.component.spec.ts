import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { render, RenderResult } from '@testing-library/angular';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let renderResult: RenderResult<HeaderComponent>;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    renderResult = await render(HeaderComponent, {
      imports: [BrowserModule, MatToolbarModule],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
