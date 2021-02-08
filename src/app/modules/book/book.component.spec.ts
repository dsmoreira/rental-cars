import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let renderResult: RenderResult<BookComponent>;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    renderResult = await render(BookComponent, {
      imports: [BrowserModule, RouterTestingModule],
    });
    fixture = renderResult.fixture;
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});
