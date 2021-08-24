/** * @jest-environment node */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNotes, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => {
  return {
    fileUpload: () => {
      return Promise.resolve('https://misfotos.com/photo.png');
    },
  };
});

global.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: 'TESTING',
  },
  notes: {
    active: {
      id: '5ksBZsU33vfLHRwq1jeU',
      title: 'hola',
      body: 'mundo',
    },
  },
};

let store = mockStore(initState);

describe('Pruebas con las acciones de notes', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test('debe de crear una nueva nota starNewNote', async () => {
    await store.dispatch(startNewNotes());
    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });
    const docId = actions[0].payload.id;
    await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });

  test('startLoadingNotes debe cargar las notas', async () => {
    await store.dispatch(startLoadingNotes('TESTING'));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('startSaveNote debe de actualizar la nota', async () => {
    const note = {
      id: '5ksBZsU33vfLHRwq1jeU',
      title: 'titulo',
      body: 'body',
    };
    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
    expect(docRef.data().title).toBe(note.title);
  });

  test('startUploading debe de actualizar el url del entry', async () => {
    const file = [];
    await store.dispatch(startUploading(file));
    const docRef = await db.doc(`/TESTING/journal/notes/5ksBZsU33vfLHRwq1jeU`).get();
    expect(docRef.data().url).toBe('https://misfotos.com/photo.png');
  });
});
