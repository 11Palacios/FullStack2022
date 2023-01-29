import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Note from './components/Note';

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]

const App = (props) => {

  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

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
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App notes={notes}/>
  </React.StrictMode>
);
