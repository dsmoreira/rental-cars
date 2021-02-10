import { ComponentFixture } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { render, RenderResult } from '@testing-library/angular';

import { CheckoutService } from './checkout.service';
import { DummyTestComponent } from '../../../../../__mocks__/DummyComponent';
import { environment } from '../../../../environments/environment';
import { Rental } from '../store/models/rental';
import { vehicles } from '../../../../../__mocks__/DbMock';

const vehicle = vehicles[0];

const rental: Rental = {
  vehicle,
  hours: 3,
  value: vehicle.hourlyValue * 3,
  date: new Date(Date.now()),
};

describe('CheckoutService', () => {
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let service: CheckoutService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      imports: [HttpClientTestingModule],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;

    httpTestingController = component.injector.get(HttpTestingController);
    service = component.injector.get(CheckoutService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve salvar o registro de aluguel', (done) => {
    const url = `${environment.apiUrl}/book`;

    service.save(rental).subscribe((resultado) => {
      done();
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');

    req.flush({});
  });
});
