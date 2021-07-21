import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [values, handleInputChange, reset] = useForm(note);

  const { body, title } = values;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id != activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input type="text" placeholder="Some awesome title" className="notes__title-input" autoComplete="off" value={title} onChange={handleInputChange} />
        <textarea placeholder="What happen today" className="notes__textarea" value={body} onChange={handleInputChange}></textarea>
        <div className="notes__image">{note.url && <img src={note.url} alt="img" />}</div>
      </div>
    </div>
  );
};
