import { types } from "../../types/types"

describe('Prueba en nuestros tipos', () => {
    test('Debe de tener estos types', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Updated note',
            notesFileUrl: '[Notes] Updated image note',
            deleteNote: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout cleaning',
          });
    })
    
})
