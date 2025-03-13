import { Request, Response, Router } from 'express'
import { validateSchema } from '../utils/middleware'
import { NewNote, newNoteSchema } from '../schemas/note'
import Note from '../models/note.model'

const notesRouter = Router()

notesRouter.get('/', (_req, res) => {
  res.send('GET /api/notes')
})

notesRouter.post(
  '/',
  validateSchema(newNoteSchema),
  async (req: Request<unknown, unknown, NewNote>, res: Response) => {
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

export default notesRouter
