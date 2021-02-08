import { ComponentFixture } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { render, RenderResult } from '@testing-library/angular';

import { AuthService } from './auth.service';
import { DummyTestComponent } from '../../../../__mocks__/DummyComponent';
import { environment } from '../../../environments/environment';
import { LoginInfo } from '../../store/models/login-info';

const loginInfo: LoginInfo = {
  userName: '78296364000',
  password: 'a1s2d3A!S@D#',
};

describe('AuthService', () => {
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      imports: [HttpClientTestingModule],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;

    httpTestingController = component.injector.get(HttpTestingController);
    service = component.injector.get(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve efetuar a chamada de login', (done) => {
    const url = `${environment.apiUrl}/user?cpf=${loginInfo.userName}&password=${loginInfo.password}`;

    service.login(loginInfo).subscribe((resultado) => {
      done();
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');

    req.flush({});
  });
});
