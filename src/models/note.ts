import mongoose, { Document, Schema } from 'mongoose'

export interface INote extends Document {
  title: string
  description: string
  importance: number
  completed: boolean
  createdAt: Date
  updatedAt: Date
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
