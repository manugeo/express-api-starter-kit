import { NextFunction, Request, Response, Router } from 'express'
import Note from '../models/note'
import { z } from 'zod'

const notesRouter = Router()

notesRouter.get('/', (_req, res) => {
  res.send('GET /api/notes')
})

const NewNoteSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3),
  importance: z.number().int().min(0).max(10),
  completed: z.boolean(),
})

type NewNoteType = z.infer<typeof NewNoteSchema>

const newNoteParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    NewNoteSchema.parse(req.body)
    console.log('New note parsed successfully', req.body)
    next()
  } catch (error) {
    console.error('Error parsing new note', error)
    next(error)
  }
}

notesRouter.post(
  '/',
  newNoteParser,
  async (req: Request<unknown, unknown, NewNoteType>, res: Response) => {
    const { title, description, importance, completed } = req.body

    if (!title || !description) {
      res.status(400).json({
        success: false,
        message: 'Title and description are required',
      })
      return
    }

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
