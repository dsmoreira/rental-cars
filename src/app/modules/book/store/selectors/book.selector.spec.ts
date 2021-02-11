import { BookState } from '../reducers/book.reducer';
import { selectBook, selectBooks, selectLoading } from './book.selector';
import { books } from '../../../../../../__mocks__/DbMock';

const state: BookState = {
  books,
  loading: false,
};

const initialState = {
  book: state,
};

describe('BookSelector', () => {
  it('deve retornar o store de reservas', () => {
    const result = selectBook.projector(initialState.book);
    expect(result).toMatchObject(state);
  });

  it('deve retornar a lista de reservas', () => {
    const result = selectBooks.projector(initialState.book);
    expect(result).toMatchObject(state.books);
  });

  it('deve retornar o indicador de loading', () => {
    const result = selectLoading.projector(initialState.book);
    expect(result).toBe(state.loading);
  });
});
