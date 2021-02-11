import { createSelector } from '@ngrx/store';
import { Book } from '../models/book';

import { BookState } from '../reducers/book.reducer';

export const selectBook = createSelector(
  (state: any) => state.checkout,
  (state: BookState) => state
);

export const selectBooks = createSelector(
  selectBook,
  (book: BookState): Book[] => book.books
);

export const selectLoading = createSelector(
  selectBook,
  (book: BookState): boolean => book.loading
);
