import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import connectDB from './utils/db'
import notesRouter from './controllers/notes'
import {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} from './utils/middleware'

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)

void connectDB()

app.use('/api/notes', notesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
