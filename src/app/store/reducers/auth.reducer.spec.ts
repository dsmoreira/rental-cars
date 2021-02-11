import { AuthActions } from '../actions';
import { AuthReducer } from './';
import { LoginInfo } from '../models/login-info';
import { LoginResult } from '../models/login-result';
import { User } from '../models/user';

const loginInfo: LoginInfo = {
  userName: '78296364000',
  password: 'a1s2d3A!S@D#',
};

const loginResult: LoginResult = {
  id: '8d57964d-7fb5-4b6d-b4c9-f0a9e3fe4e15',
  name: 'Daniel Silva Moreira',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
};

describe('AuthReducer', () => {
  it('deve retornar um estado inicial', () => {
    const { initialState } = AuthReducer;
    const action = {
      type: 'Unknown',
    };

    const state = AuthReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('ao solicitar login deve iniciar o loading', () => {
    const { initialState } = AuthReducer;

    const newState: AuthReducer.AuthState = {
      ...initialState,
      loading: true,
    };

    const action = AuthActions.login({ loginInfo });

    const state = AuthReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao efetuar login com sucesso deve parar o loading retornar as informações do usuário', () => {
    const { initialState } = AuthReducer;

    const newState: AuthReducer.AuthState = {
      ...initialState,
      userId: loginResult.id,
      name: loginResult.name,
      token: loginResult.token,
      loading: false,
    };

    const action = AuthActions.loginSuccess({ loginResult });

    const state = AuthReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao efetuar login com erro deve parar o loading', () => {
    const { initialState } = AuthReducer;

    const newState: AuthReducer.AuthState = {
      ...initialState,
      loading: false,
    };

    const action = AuthActions.loginError({
      error: { message: 'Opss!!' },
    });

    const state = AuthReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao efetuar logout os dados do usuário devem ser limpos', () => {
    const { initialState } = AuthReducer;

    const currentState = {
      ...initialState,
      userId: loginResult.id,
      name: loginResult.name,
      token: loginResult.token,
      loading: false,
    };

    const newState: AuthReducer.AuthState = {
      ...initialState,
      userId: '',
      name: '',
      token: '',
      loading: false,
    };

    const action = AuthActions.logout();

    const state = AuthReducer.reducer(currentState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao solicitar um cadastro a aplicação deve informar que esta carregando', () => {
    const { initialState } = AuthReducer;

    const newState: AuthReducer.AuthState = {
      ...initialState,
      loading: true,
    };

    const action = AuthActions.signup({ user: {} as User });

    const state = AuthReducer.reducer(initialState, action);

    expect(state).toMatchObject(newState);
  });

  it('ao finalizar o cadastro com sucesso ou o erro a aplicação deve parar o loading', () => {
    const { initialState } = AuthReducer;

    const currentState = {
      ...initialState,
      loading: true,
    };

    const newState: AuthReducer.AuthState = {
      ...initialState,
      loading: false,
    };

    expect(
      AuthReducer.reducer(currentState, AuthActions.signupSuccess())
    ).toMatchObject(newState);
    expect(
      AuthReducer.reducer(
        currentState,
        AuthActions.signupError({ error: {} as Error })
      )
    ).toMatchObject(newState);
  });
});
