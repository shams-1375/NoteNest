const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// ROUTE 1:  Get all the notes using GET
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

// ROUTE 2: add the notes using POST
router.post('/addnote', fetchuser, [
    body('title', 'Enter a title of atleast 5 characters').isLength({ min: 5 }),
    body('description', 'Enter a description of atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // if there are errors return error and bad request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const notes = new Notes({
                title, description, tag, user: req.user.id
            })
            const savednote = await notes.save()
            res.json(savednote)

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error occured");
        }
    })

// ROUTE 3: Update Notes by using PUT
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).send("The note you are trying to update is Not Found") }

        // check whether the user deleting is the owner of that note
        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { note: true })
        res.json({ notes })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

// ROUTE 4: Delete Notes by using PUT
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).send("The note you are trying to delete is Not Found") }

        // check whether the user deleting is the owner of that note
        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        notes = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "The note has been deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})
module.exports = router