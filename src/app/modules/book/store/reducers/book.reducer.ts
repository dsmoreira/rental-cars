import { Action, createReducer, on } from '@ngrx/store';

import { BookActions } from '../actions/index';
import { Book } from '../models/book';

export interface BookState {
  books: Array<Book>;
  loading: boolean;
}

export const initialState: BookState = {
  books: [],
  loading: false,
};

const bookReducer = createReducer(
  initialState,
  on(BookActions.getBooks, (state) => ({
    ...state,
    loading: true,
  })),
  on(BookActions.getBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    loading: false,
  })),
  on(BookActions.getBooksError, (state) => ({
    ...state,
    loading: false,
  }))
);

export function reducer(
  state: BookState | undefined,
  action: Action
): BookState {
  return bookReducer(state, action);
}
