import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { BookComponent } from './book.component';
import { CheckoutResumeModule } from '../../shared/components/checkout-resume/checkout-resume.module';
import { provideMockStore } from '@ngrx/store/testing';
import { LoadingModule } from '../../shared/components/loading/loading.module';
import { HeaderModule } from '../../core/layout/header/header.module';
import { LoginDetailModule } from '../../shared/components/login-detail/login-detail.module';
import { MatButtonModule } from '@angular/material/button';

describe('BookComponent', () => {
  let renderResult: RenderResult<BookComponent>;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    renderResult = await render(BookComponent, {
      imports: [
        BrowserModule,
        CheckoutResumeModule,
        HeaderModule,
        LoadingModule,
        LoginDetailModule,
        RouterTestingModule,
        MatButtonModule,
      ],
      providers: [provideMockStore({})],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
