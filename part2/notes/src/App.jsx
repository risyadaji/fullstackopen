import { useState, useEffect } from 'react'

import noteService from './services/notes'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    // Only run after all components rendered
    // SetNotes will cause a re-rendering
    noteService.getAll().then((notes) => setNotes(notes))
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changeNote = { ...note, important: !note.important }

    noteService
      .update(id, changeNote)
      .then((updatedNote) => {
        // Avoid direct changes + with .map we will get all new array
        // including updated one
        setNotes(notes.map((n) => (n.id !== id ? n : updatedNote)))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already deleted from server`
        )
        setTimeout(() => setErrorMessage(null), 3000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()

    if (newNote.length !== 0) {
      const noteObject = {
        id: String(notes.length + 1),
        important: Math.random() < 0.5,
        content: newNote,
      }

      noteService.create(noteObject).then((newNote) => {
        setNotes(notes.concat(newNote))
        setNewNote('')
      })
    }
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
