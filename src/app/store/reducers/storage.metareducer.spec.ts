import { AuthActions } from '../actions';
import { LoginResult } from '../models/login-result';
import { storageMetaReducer } from './storage.metareducer';

const fakeAuthState = {
  token: 'teste',
};

const localStorageMock = {
  getItem: (): string => {
    return JSON.stringify(fakeAuthState);
  },
  setItem: (): void => {},
  removeItem: (): void => {},
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const storageSaveSpy = jest.spyOn(localStorageMock, 'setItem');
const storageGetSpy = jest.spyOn(localStorageMock, 'getItem');
const storageRemoveSpy = jest.spyOn(localStorageMock, 'removeItem');

const fakeLoginResult = {} as LoginResult;

describe('StorageMetareducer', () => {
  it('ao disparar a ação de login com sucesso deve salvar as informações do estado de autenticação no localstorage', () => {
    const action = AuthActions.loginSuccess({ loginResult: fakeLoginResult });

    storageMetaReducer(() => {
      return { auth: {} };
    })({}, action);

    expect(storageSaveSpy).toHaveBeenCalled();
  });

  it('ao disparar a ação de logout deve limpar as informações de autenticação do locastorage', () => {
    const action = AuthActions.logout();

    storageMetaReducer(() => {
      return { auth: {} };
    })({}, action);

    expect(storageRemoveSpy).toHaveBeenCalled();
  });

  it('ao carregar pela primeira a store deve ser verificado se existe estado de autenticação no localstorage e em caso positivo o mesmo deve ser carregado', () => {
    const action = AuthActions.noopAction();

    const result = storageMetaReducer(() => {
      return { auth: {} };
    })({}, action);

    expect(result.auth).toMatchObject(fakeAuthState);
    expect(storageGetSpy).toHaveBeenCalled();
  });

  it('o metareducer deve tentar carregar o estado armazenado somente na primeira execução', () => {
    storageGetSpy.mockReset();

    const action = AuthActions.noopAction();

    const metareducer = storageMetaReducer(() => {
      return { auth: {} };
    });

    metareducer({}, action);
    metareducer({}, action);

    expect(storageGetSpy).toHaveBeenCalledTimes(1);
  });
});
