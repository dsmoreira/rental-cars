import { createAction, props } from '@ngrx/store';

import { AppError } from '../../../../core/models/app-error';
import { Book } from '../models/book';

export const getBooks = createAction('[Book] Get');

export const getBooksSuccess = createAction(
  '[Book] Get success',
  props<{ books: Array<Book> }>()
);

export const getBooksError = createAction(
  '[Book] Get error',
  props<{ error: AppError }>()
);
