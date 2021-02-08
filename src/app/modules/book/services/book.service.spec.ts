import { ComponentFixture } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { render, RenderResult } from '@testing-library/angular';

import { books } from '../../../../../__mocks__/DbMock';
import { DummyTestComponent } from '../../../../../__mocks__/DummyComponent';
import { environment } from '../../../../environments/environment';
import { BookService } from './book.service';

describe('BookService', () => {
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let service: BookService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      imports: [HttpClientTestingModule],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;

    httpTestingController = component.injector.get(HttpTestingController);
    service = component.injector.get(BookService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar as reservas', (done) => {
    const userId = '10569156-149c-48bb-98d5-b1e112047ff4';
    const url = `${environment.apiUrl}/books?userId=${userId}`;

    service.getBooks(userId).subscribe((resultado) => {
      expect(resultado).toMatchObject(books);
      done();
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');

    req.flush(books);
  });
});
