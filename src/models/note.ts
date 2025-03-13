import mongoose, { Document, Schema } from 'mongoose'
import { z } from 'zod'

// Zod schema as the source of truth
export const NoteSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3),
  importance: z.number().int().min(0).max(10),
  completed: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type NoteType = z.infer<typeof NoteSchema>

// For new note creation (without timestamps)
export const NewNoteSchema = NoteSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export type NewNoteType = z.infer<typeof NewNoteSchema>

// Mongoose interface derived from our Zod schema
export interface INote extends Document, Omit<NoteType, 'createdAt' | 'updatedAt'> {
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema derived from our Zod schema
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
