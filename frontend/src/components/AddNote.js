import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    props.showAlert(" Your note has been added successfully!", "success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className="container mt-3 note-container">
        <h1>Create a New Note</h1>
        <form className="contanier mt-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
          </div>
          <button type="submit" disabled={note.title.length===0 || note.description.length===0} className="btn btn-primary mt-3" onClick={handleOnClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
