import React from 'react';

const Note = ({ note, toggleImportance, className }) => {
    const label = note.important ? 'make not important' : 'make important'

    return <li className={className}>{note.content} <button onClick={toggleImportance}>{label}</button></li>
  }
  

export default Note;
