import { Request, Response, Router } from 'express'
import { validateSchema } from '../utils/middleware'
import {
  NewNote,
  newNoteSchema,
  UpdateNote,
  updateNoteSchema,
} from '../schemas/note.schema'
import Note from '../models/note.model'

const notesRouter = Router()

notesRouter.post(
  '/',
  validateSchema(newNoteSchema),
  async (req: Request<unknown, unknown, NewNote>, res: Response) => {
    // NOTE: No try-catch needed here because express-async-errors library will
    // automatically catch any errors and forward them to our error handler middleware
    const { title, description, importance, completed } = req.body

    const note = new Note({
      title,
      description,
      importance: importance || 5,
      completed: completed || false,
    })
    const savedNote = await note.save()
    res.status(201).json({
      success: true,
      data: savedNote,
    })
  },
)

notesRouter.get('/', async (_req, res) => {
  const notes = await Note.find({})
  res.json({
    success: true,
    data: notes,
  })
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (!note) {
    res.status(404).json({
      success: false,
      message: 'Note not found',
    })
    return
  }
  res.json({
    success: true,
    data: note,
  })
})

notesRouter.put(
  '/:id',
  validateSchema(updateNoteSchema),
  async (req: Request<{ id: string }, unknown, UpdateNote>, res: Response) => {
    const { id } = req.params
    const existingNote = await Note.findById(id)
    if (!existingNote) {
      res.status(404).json({
        success: false,
        message: 'Note not found',
      })
      return
    }
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    res.json({
      success: true,
      data: updatedNote,
    })
  },
)

notesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const existingNote = await Note.findById(id)
  if (!existingNote) {
    res.status(404).json({
      success: false,
      message: 'Note not found',
    })
    return
  }
  await Note.findByIdAndDelete(id)
  res.status(200).json({
    success: true,
    message: 'Note deleted successfully',
  })
})

export default notesRouter
