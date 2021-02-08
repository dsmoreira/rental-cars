import { books } from '../../../../../../__mocks__/DbMock';
import { BookActions } from '../actions';
import { BookReducer } from './';

describe('BookReducer', () => {
  it('deve retornar um estado inicial', () => {
    const { initialState } = BookReducer;
    const action = {
      type: 'Unknown',
    };

    const state = BookReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('ao carregar as reservas deve iniciar o loading', () => {
    const { initialState } = BookReducer;

    const newState: BookReducer.BookState = {
      books: [],
      loading: true,
    };

    const action = BookActions.getBooks();

    const state = BookReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao carregar com sucesso deve parar o loading e conter a lista de reservas', () => {
    const { initialState } = BookReducer;

    const newState: BookReducer.BookState = {
      books,
      loading: false,
    };

    const action = BookActions.getBooksSuccess({ books });

    const state = BookReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao carregar com erro deve parar o loading', () => {
    const { initialState } = BookReducer;

    const newState: BookReducer.BookState = {
      books: [],
      loading: false,
    };

    const action = BookActions.getBooksError({
      error: { message: 'Opss!!' },
    });

    const state = BookReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });
});
