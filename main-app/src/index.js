import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Note from './components/Note';
import axios from 'axios';

const App = () => {

  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
      axios
        .get('http://localhost:3001/notes')
        .then(response => {
          setNotes(response.data)
        })
  }, [])
  

  const notesToShow = showAll ? notes : notes.filter ( note => note.important === true)

  const handleNewNote = (e) => {
    setNewNote(e.target.value)
  }
  
  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote('')
    document.getElementById('input').value = '';
  }

  

  return (
    <div>
      <h1>Notes</h1>
      {notes ?
      <>
      <div>        
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }        
        </button>      
      </div>
      <ul>
        {notesToShow.map(
          note =>(
            <Note key={note.id} note={note} />
          ) 
        )}
      </ul>
      <form onSubmit={addNote}>
        <input placeholder='a new note...' onChange={handleNewNote} id='input' />
        <button type="submit">save</button>      
      </form>
      </>
      :   <p>Connecting</p>}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
