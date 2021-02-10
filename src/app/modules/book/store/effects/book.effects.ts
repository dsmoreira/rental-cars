import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
  take,
  tap,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { BookActions } from '../actions';
import { BookService } from '../../services/book.service';
import { NavigationActions } from '../../../../store/actions/index';
import { NotificationService } from '../../../../core/services/notification.service';
import { selectUserId } from '../../../../store/selectors/auth.selector';

@Injectable()
export class BookEffects {
  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
    private bookService: BookService,
    private store: Store
  ) {}

  booksNavigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationActions.navigationPerfomed),
      filter((action) => action.payload.path === '/books'),
      concatMap(() => of(BookActions.getBooks()))
    )
  );

  getBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.getBooks),
      mergeMap(() => this.store.select(selectUserId).pipe(take(1))),
      mergeMap((userId) =>
        this.bookService.getBooks(userId).pipe(
          map((books) => BookActions.getBooksSuccess({ books })),
          catchError((error) => {
            return of(
              BookActions.getBooksError({
                error: { message: error },
              })
            );
          })
        )
      )
    )
  );

  getBooksError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.getBooksError),
      map((action: any) => action.error),
      tap((error) => this.notificationService.notifyError(error))
    )
  );
}
