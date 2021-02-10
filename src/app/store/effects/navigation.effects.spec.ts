import { Action, Store } from '@ngrx/store';
import {
  ActivatedRouteSnapshot,
  ActivationStart,
  NavigationEnd,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Observable, of, Subject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { render, RenderResult } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { DummyTestComponent } from '../../../../__mocks__/DummyComponent';
import { NavigationEffects } from './navigation.effects';
import { NavigationActions } from '../actions';

describe('NavigationEffects', () => {
  const routerEventSubject: Subject<any> = new Subject();
  const routerMock = {
    navigate: jest.fn(),
    events: routerEventSubject.asObservable(),
    url: '',
  };

  let actions$: Observable<Action>;
  let renderResult: RenderResult<DummyTestComponent>;
  let fixture: ComponentFixture<DummyTestComponent>;
  let component: DummyTestComponent;
  let store: Store;
  let effects: NavigationEffects;
  let router: Router;
  let location: Location;

  let routerNaviteSpy: jest.SpyInstance;
  let locationBackSpy: jest.SpyInstance;
  let locationForwardSpy: jest.SpyInstance;
  let storeSpy: jest.SpyInstance;

  beforeEach(async () => {
    renderResult = await render(DummyTestComponent, {
      imports: [RouterTestingModule],
      providers: [
        NavigationEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;

    effects = component.injector.get(NavigationEffects);
    router = component.injector.get(Router);
    location = component.injector.get(Location);
    store = component.injector.get(Store);

    routerNaviteSpy = jest.spyOn(router, 'navigate');
    locationBackSpy = jest.spyOn(location, 'back');
    locationForwardSpy = jest.spyOn(location, 'forward');
    storeSpy = jest.spyOn(store, 'dispatch');
  });

  it('deve ser criado', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('ao executar a ação navigationGo serviço de navegação deve ser acionado', (done) => {
    actions$ = of(
      NavigationActions.navigationGo({
        path: [''],
        queryParams: {},
        extras: {},
      })
    );

    effects.navigate$.subscribe(() => {
      expect(routerNaviteSpy).toBeCalled();
      done();
    });
  });

  it('ao acontecer um evento de alteração de rota deve ser gerado um Action de alteração de rota', () => {
    const snapshot = new ActivatedRouteSnapshot();
    snapshot.queryParams = { id: 1 };
    snapshot.url = [new UrlSegment('test', {})];
    snapshot.params = {};
    snapshot.data = {};
    const routeConfig: Route = {
      path: 'test',
    };

    Object.assign(snapshot, { routeConfig });

    routerEventSubject.next(new ActivationStart(snapshot));

    routerEventSubject.next(new NavigationEnd(1, '', ''));

    expect(storeSpy).toHaveBeenCalledWith({
      params: {},
      queryParams: { id: 1 },
      data: {},
      path: 'test',
      type: NavigationActions.navigationPerfomed.type,
    });
  });
});
