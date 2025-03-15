import { z } from 'zod'

export const noteSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3),
  importance: z.number().int().min(0).max(10),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export const newNoteSchema = noteSchema.omit({
  createdAt: true,
  updatedAt: true,
})
export const updateNoteSchema = noteSchema.omit({
  createdAt: true,
  updatedAt: true,
}).partial()

export type Note = z.infer<typeof noteSchema>
export type NewNote = z.infer<typeof newNoteSchema>
export type UpdateNote = z.infer<typeof updateNoteSchema>
