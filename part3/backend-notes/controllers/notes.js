const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

notesRouter.post('/', async (req, res) => {
  const { content, important } = req.body

  const note = new Note({
    content: content,
    important: important || false,
  })

  const savedNote = await note.save()
  res.status(201).json(savedNote)
})

notesRouter.put('/:id', async (req, res) => {
  const { content, important } = req.body

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )

  res.json(updatedNote)
})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = notesRouter
