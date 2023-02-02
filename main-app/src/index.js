import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Note from './components/Note';
import noteService from './services/notes';
import './index.css';
import Notification from './components/Notification';

const App = () => {

  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
      noteService.getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
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
      //id: notes.length + 1,
    }

    noteService.create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
      document.getElementById('input').value = ''
    })
  }

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
    .catch(error => {
      setErrorMessage(`the note ${note.content} was already deleted from the server`)
      setTimeout(() => {          setErrorMessage(null)        }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
            <Note key={note.id} note={note} className='note' toggleImportance={() => toggleImportance(note.id)}/>
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
