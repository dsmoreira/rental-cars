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
import { User } from '../../store/models/user';

const loginInfo: LoginInfo = {
  userName: '78296364000',
  password: 'a1s2d3A!S@D#',
};

const user: User = {
  document: '78296364000',
  name: 'Daniel Silva Moreira',
  birthdate: '1989-03-03',
  zipcode: '30000-000',
  street: 'Av do Contorno',
  number: 1500,
  complement: 'Sala 1220',
  city: 'Belo Horizonte',
  state: 'MG',
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

  it('deve criar a chamada de login', (done) => {
    const url = `${environment.apiUrl}/user?document=${loginInfo.userName}`;

    service.login(loginInfo).subscribe((resultado) => {
      done();
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');

    req.flush({});
  });

  it('deve criar a chamada de signup', (done) => {
    const url = `${environment.apiUrl}/user`;

    service.signup(user).subscribe((resultado) => {
      done();
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');

    req.flush({});
  });
});
