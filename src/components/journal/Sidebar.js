import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNotes } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleAddNew = () =>{
    dispatch(startNewNotes());
  }

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3>
          <i className="far fa-moon" />
          <span> {name} </span>
        </h3>
        <button className="btn" onClick={handleLogout}>
          logout
        </button>
      </div>
      <div className="journal__new-entry" onClick={handleAddNew} >
        <i className="far fa-calendar-plus fa-5x" />
        <p className="mt-5">New Entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};
