import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { notes, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3 note-card">
                <div className="card-body">
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-dark" style={{ left: '90%', zIndex: '1', fontSize: 15 }}>{notes.tag}</span>
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(notes._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(notes)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
