import mongoose, { Document, Schema } from 'mongoose'
import { z } from 'zod'

export const noteSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3),
  importance: z.number().int().min(0).max(10),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export const createNoteSchema = noteSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export type Note = z.infer<typeof noteSchema>
export type NewNoteType = z.infer<typeof createNoteSchema>

export interface INote extends Document, Omit<Note, 'createdAt' | 'updatedAt'> {
  createdAt: Date;
  updatedAt: Date;
}

const mongooseNoteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    importance: {
      type: Number,
      min: [0, 'Importance must be at least 0'],
      max: [10, 'Importance cannot exceed 10'],
      default: 5,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

const Note = mongoose.model<INote>('Note', mongooseNoteSchema)

export default Note
