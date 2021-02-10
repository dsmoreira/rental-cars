import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const navigationGo = createAction(
  '[Navigation] Go',
  props<{
    path: any[];
    queryParams?: object;
    extras?: NavigationExtras;
  }>()
);

export const navigationPerfomed = createAction(
  '[Navigation] Route Perfomed',
  props<{
    params: any;
    queryParams: any;
    data: any;
    path: string;
  }>()
);

export const navigationEnd = createAction('[Navigation] End');
