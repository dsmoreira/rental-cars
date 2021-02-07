import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const navigationGo = createAction(
  '[Navigation] Go',
  props<{
    payload: { path: any[]; queryParams?: object; extras?: NavigationExtras };
  }>()
);

export const navigationBack = createAction('[Navigation] Back');

export const navigationForward = createAction('[Navigation] Forward');

export const navigationPerfomed = createAction(
  '[Navigation] Route Perfomed',
  props<{
    payload: { params: any; queryParams: any; data: any; path: string };
  }>()
);
