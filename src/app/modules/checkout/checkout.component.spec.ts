import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let renderResult: RenderResult<CheckoutComponent>;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    renderResult = await render(CheckoutComponent, {
      imports: [BrowserModule, RouterTestingModule],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
