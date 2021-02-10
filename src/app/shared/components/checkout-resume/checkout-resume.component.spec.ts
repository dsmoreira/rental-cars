import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';

import { CheckoutResumeComponent } from './checkout-resume.component';

describe('CheckoutResumeComponent', () => {
  let renderResult: RenderResult<CheckoutResumeComponent>;
  let fixture: ComponentFixture<CheckoutResumeComponent>;

  beforeEach(async () => {
    renderResult = await render(CheckoutResumeComponent, {
      imports: [BrowserModule],
      providers: [provideMockStore({})],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
