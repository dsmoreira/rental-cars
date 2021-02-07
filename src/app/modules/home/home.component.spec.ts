import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let renderResult: RenderResult<HomeComponent>;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    renderResult = await render(HomeComponent, {
      imports: [BrowserModule, RouterTestingModule],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
