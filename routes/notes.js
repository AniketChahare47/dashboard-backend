const express = require('express');
const Notes = require('../module/Notes');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../fetch/fetchuser');

// ✅ Add a new note  → POST /api/notes
router.post(
  '/',
  fetchuser,
  [
    body('title', 'Enter valid title').isLength({ min: 2 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
    body('author', 'Author must be at least 3 characters').isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, author } = req.body;

      const note = new Notes({
        title,
        description,
        author,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// ✅ Fetch all notes → GET /api/notes
router.get('/', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Update note → PUT /api/notes/:id
router.put('/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (author) newNote.author = author;

    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Not found' });

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not allowed' });
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Delete note → DELETE /api/notes/:id
router.delete('/:id', fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Not found' });

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not allowed' });
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: 'Note has been deleted', note });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
