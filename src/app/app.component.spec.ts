import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let renderResult: RenderResult<AppComponent>;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    renderResult = await render(AppComponent, {
      imports: [BrowserModule, RouterTestingModule],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
