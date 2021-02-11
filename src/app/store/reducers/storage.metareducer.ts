import { ActionReducer, MetaReducer } from '@ngrx/store';

import { AuthActions } from '../actions';

const authStorageKey = 'AUTH_STORAGE';

export function storageMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  let onInit = true;

  return (state, action): any => {
    const nextState = reducer(state, action);

    if (action.type === AuthActions.loginSuccess.type) {
      saveInStorage(authStorageKey, nextState.auth);
    }

    if (action.type === AuthActions.logout.type) {
      removeFromStorage(authStorageKey);
    }

    if (onInit) {
      onInit = false;

      const authStorage = getFromStorage(authStorageKey);

      if (!!authStorage) {
        return {
          ...nextState,
          auth: {
            ...authStorage,
          },
        };
      }
    }

    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];

function saveInStorage(key: string, value: any): void {
  if (localStorage) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

function getFromStorage(key: string): any | null {
  if (localStorage) {
    return JSON.parse(localStorage.getItem(key) ?? 'null');
  }
}

function removeFromStorage(key: string): void {
  if (localStorage) {
    localStorage.removeItem(key);
  }
}
