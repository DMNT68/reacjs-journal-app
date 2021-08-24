import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas authReducer', () => {
  test('debe de realizar el login', () => {
    const initState = {};

    const action = {
      type: types.login,
      payload: {
        uid: 'abc',
        displayName: 'Andres',
      },
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({
      uid: 'abc',
      name: 'Andres',
    });
  });

  test('debe de realizar el logout', () => {
    const initState = {
      uid: 'abc',
      name: 'Andres',
    };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({});
  });

  test('No debe hacer los cambios en le state', () => {
    const initState = {
      uid: 'abc',
      name: 'Andres',
    };

    const action = {
      type: 'asdasdas',
    };

    const state = authReducer(initState, action);

    expect(state).toEqual(initState);
  });
});
