import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;

      if (!note.url) delete note.url;

      const noteToFirestore = { ...note };
      noteToFirestore.date = new Date().getTime();
      delete noteToFirestore.id;
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
      dispatch(refreshNote(note.id, noteToFirestore));
      Swal.fire('Saved', note.title, 'success');
    } catch (error) {
      Swal.fire('Error', 'Could not save, try again later', 'success');
    }
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    await db.doc(`${uid}/journal/notes/${id}`);
    dispatch(deleteNote(id));
    Swal.fire('Note deleted', 'success');
  };
};

export const deleteNote = (id) => ({
  type: types.deleteNote,
  payload: id,
});

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};

export const notesLogout = () => ({
  type: types.notesLogoutCleaning,
  payload: {
    notes: [],
    active: null,
  },
});
