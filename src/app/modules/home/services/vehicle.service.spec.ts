import { ComponentFixture } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { render, RenderResult } from '@testing-library/angular';

import { vehicles } from '../../../../../__mocks__/DbMock';
import { DummyTestComponent } from '../../../../../__mocks__/DummyComponent';
import { environment } from '../../../../environments/environment';
import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let service: VehicleService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      imports: [HttpClientTestingModule],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;

    httpTestingController = component.injector.get(HttpTestingController);
    service = component.injector.get(VehicleService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar os veículos', (done) => {
    const url = `${environment.apiUrl}/vehicles`;

    service.availableVehicles().subscribe((resultado) => {
      expect(resultado).toMatchObject(vehicles);
      done();
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');

    req.flush(vehicles);
  });
});
