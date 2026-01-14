import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const {showAlert}= props
    const host = "https://notenest-u51w.onrender.com"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // GET all Notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    // ADD a Note
    const addNote = async (title, description, tag) => {

        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })

        const note = await response.json();
        setNotes(notes.concat(note))
    }


    // DELETE a Note
    const deleteNote = async (id) => {

        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        props.showAlert("Note has been Delted Successfully", "success")
        
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }
    
    // EDIT a Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        getNotes();
        const json = await response.json();
        console.log(json);
    }
    return (
        <NoteContext.Provider value={{ notes, notesInitial, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;